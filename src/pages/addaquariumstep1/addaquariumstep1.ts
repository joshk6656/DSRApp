import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SelectmethodPage } from '../selectmethod/selectmethod';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  aquarium;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider, public authService: AuthServiceProvider) {
    this.aquarium = this.dsrData.aquariumObject;
    if (!this.aquarium.country) {this.aquarium.country = "Nederland";}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addaquariumstep1Page');
    console.log(this.aquarium)
  }

  next() {
    console.log('Saving Aquarium');
    let me = this;

    console.log("Saving: " + this.aquarium);

    /*let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let params = this.aquarium;
    let urlSearchParams = new URLSearchParams();		
    for(let keys in params){
      urlSearchParams.append(keys, params[keys]);
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/add', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium add returned following data: ', JSON.stringify(data));
      */

      this.dsrData.addAquarium(this.aquarium, function (aquaid) {
        if (aquaid) {
          me.navCtrl.push(SelectmethodPage, {"aquariumid": aquaid});
        }
      })

    //})
  }

  getFactor(type, array) {
    for (let item in array) {
      if (type == array[item]["name"]) return array[item]["factor"];
    }
  }

  updateTotalValue() {
    this.watervolume = (this.aquarium.aquarium_lngth / 10) * (this.aquarium.aquarium_width / 10) * (this.aquarium.aquarium_waterheight / 10)
    console.log(this.aquarium)
    console.log("Sump active?")
    console.log(this.aquarium.sump_active);
    if (this.aquarium.sump_active) {
      console.log("Sump active: " + this.aquarium.sump_lngth + " / " + this.aquarium.sump_width + "/" + this.aquarium.sump_waterheight);
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
    this.watervolume = Math.round(this.watervolume * 100) / 100;
    this.aquarium.totalwatervolume = this.watervolume;
  }

}
