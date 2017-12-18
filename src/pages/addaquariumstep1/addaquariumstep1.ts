import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SelectmethodPage } from '../selectmethod/selectmethod';
import { AquariumdetailsPage } from '../aquariumdetails/aquariumdetails';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

/**
 * Generated class for the Addaquariumstep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-addaquariumstep1',
  templateUrl: 'addaquariumstep1.html',
})
export class Addaquariumstep1Page {
  aquariumid;
  aquarium;
  mode = 'ADD';
  watervolume = 0;
  watervolumebruto = 0;
  rocktypes = [
    {name: "natureocean", factor: 0.46, descr: "Nature's Ocean base rock"},
    {name: "liferock", factor: 0.48, descr: "Generic Life Rock"},
    {name: "deadrock", factor: 0.45, descr: "Generic Dead Rock"}
  ]
  sandtypes = [
    {name: "coralsand0510dry", factor: 0.84, descr: "Koraal zand 0,5-1mm droog"},
    {name: "coralsand0510wet", factor: 0.75, descr: "Koraal zand 0,5-1mm nat"},
  ]
  occupationtypes = [
    {name: "EMPTY", descr: "Leeg (startup)"},
    {name: "LOW",  descr: "Laag (Weinig vissen en koralen)"},
    {name: "MID",  descr: "Middelmatig (Enkele vissen en koralen)"},
    {name: "HIGH",  descr: "Hoog (Veel vissen en kortalen)"}
  ]
  countries = [
    {code: "BE", name: "België"},
    {code: "NL",  name: "Nederland", selected: true},
    {code: "FR",  name: "Frankrijk"},
    {code: "DE",  name: "Duitsland"}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider, public authService: AuthServiceProvider, private log: LoggerServiceProvider) {
    let aquariumid = navParams.get("aquariumid");
    if (aquariumid) {
      this.log.setAquarium(this.aquarium);
      this.aquariumid = aquariumid;
      this.log.debug('Addaquariumstep1Page','constructor','Editing: ' + JSON.stringify(aquariumid));
      this.mode = "EDIT";
      this.aquarium = this.dsrData.aquariums[aquariumid];
      if (!this.aquarium.hasOwnProperty("volumecorrection")) {
        this.aquarium["volumecorrection_active"] = false;
        this.aquarium["volumecorrection"] = 0.00;
      }
      this.updateTotalValue();
    } else {
      this.aquarium = this.dsrData.aquariumObject;
      if (!this.aquarium.country) {this.aquarium.country = "Nederland";}
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addaquariumstep1Page');
  }

  next() {
    let me = this;
    if (!me.checkInput()) {
      return;
    }
    me.log.debug('Addaquariumstep1Page','next','Adding: ' + JSON.stringify(this.aquarium));
    this.dsrData.addAquarium(this.aquarium, function (aquaid) {
      if (aquaid) {
        me.navCtrl.push(SelectmethodPage, {"aquariumid": aquaid});
      }
    })
  }

  save() {
    let me = this;
    if (!me.checkInput()) {
      return;
    }
    me.log.debug('Addaquariumstep1Page','next','Saving: ' + JSON.stringify(this.aquarium));
    this.dsrData.updateAquarium(this.aquariumid, this.aquarium, function (res) {
      if (res) {
        me.navCtrl.push(AquariumdetailsPage, {"aquariumid": me.aquariumid});
      }
    })
  }

  checkInput() {
    if (!this.aquarium.location) {
      this.log.info('Addaquariumstep1Page','next','Should specify location');
      this.log.showAlert('Locatie Gemeente', "Gemeente is een verplicht veld. Dit laat ons toe te bepalen waar de meeste gebruikers zich bevinden.", ['OK']);
      return false;
    }
    if (!this.aquarium.name || this.aquarium.name === "Glenn's aquarium") {
      this.log.info('Addaquariumstep1Page','next','Should specify a name');
      this.log.showAlert('Naam aquarium?', "Gelieve een naam voor uw aquarium op te geven.", ['OK']);
      return false;
    }
    if (!this.aquarium.aquarium_lngth || !this.aquarium.aquarium_width || !this.aquarium.aquarium_waterheight) {
      this.log.info('Addaquariumstep1Page','next','Should specify water content');
      this.log.showAlert('Afmetingen aquarium?', "Wij hebben de binnenafmetingen van uw aquarium nodig om een schatting te maken van uw watervolume.", ['OK']);
      return false;
    }
    if (this.watervolume <= 5) {
      this.log.info('Addaquariumstep1Page','next','Should specify VALID water content');
      this.log.showAlert('Afmetingen aquarium?', "Afmetingen dienen opgegeven te worden in cm. Watervolume moet hoger liggen dan 5l.", ['OK']);
      return false;
    }
    return true;
  }

  getFactor(type, array) {
    for (let item in array) {
      if (type == array[item]["name"]) return array[item]["factor"];
    }
  }

  updateTotalValue() {
    this.log.debug('Addaquariumstep1Page','updateTotalValue','Aquarium data: ' + JSON.stringify(this.aquarium));
    this.watervolume = (this.aquarium.aquarium_lngth / 10) * (this.aquarium.aquarium_width / 10) * (this.aquarium.aquarium_waterheight / 10)
    if (this.aquarium.sump_active) {
      this.watervolume = this.watervolume + ((this.aquarium.sump_lngth / 10) * (this.aquarium.sump_width / 10) * (this.aquarium.sump_waterheight / 10))
    }
    if (this.aquarium.refugium_active) {
      this.watervolume = this.watervolume + ((this.aquarium.refugium_lngth / 10) * (this.aquarium.refugium_width / 10) * (this.aquarium.refugium_waterheight / 10))
    }
    this.watervolumebruto = Math.round(this.watervolume * 100) / 100;
    if (this.aquarium.detailedestimation_active) {
      this.watervolume -= (this.aquarium.de_rockformation * (this.aquarium.de_rockformationtype == "other" ? this.aquarium.de_rockformationcustomfactor : this.getFactor(this.aquarium.de_rockformationtype, this.rocktypes)))
      this.watervolume -= (this.aquarium.de_sandvolume * (this.aquarium.de_sandvolumetype == "other" ? this.aquarium.de_sandvolumecustomfactor : this.getFactor(this.aquarium.de_sandvolumetype, this.sandtypes)))
    }
    if (this.aquarium.volumecorrection_active) {
      this.watervolume = Number(this.watervolume) + Number(this.aquarium.volumecorrection);
    }
    this.watervolume = Math.round(this.watervolume * 100) / 100;
    this.aquarium.totalwatervolume = this.watervolume;
  }

}
