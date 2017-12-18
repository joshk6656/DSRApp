import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { HelpdetailsPage } from '../helpdetails/helpdetails';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';


/**
 * Generated class for the AddmeasurementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addmeasurement',
  templateUrl: 'addmeasurement.html',
})
export class AddmeasurementPage {
  methodoptions = {"EZ": {"KH": true, "Ca": true, "NO3": true, "PO4": true}}
  showalltests = false;
  showphandsalinity = false;
  aquariumname: String = null;
  aquariumid;

  newmeasurement = {
    ph: null,
    salinity: null,
    kh: null,
    ca: null,
    mg: null,
    kalium: null,
    strontium: null,
    boor: null,
    jodide: null,
    po4: null,
    no3: null,
    no2: null,
    iron: null,
    tom: new Date().toISOString().slice(0,10)
  }
  measurementgoals;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private dsrData: DsrDataProvider, private log: LoggerServiceProvider) {
    this.aquariumid= navParams.get("aquariumid");
    this.log.info('AddMeasurementPage','constructor','Preparing Measurement Page for aquariumid: ' + this.aquariumid);
    if (this.aquariumid) {
      this.aquariumname = this.dsrData.aquariums[this.aquariumid].name;
      this.measurementgoals = this.dsrData.measurementgoals;
    } else {
      this.log.warning('AddMeasurementPage','constructor','No aquariumid provided?');
    }
    if (this.dsrData.aquariums[this.aquariumid].DSRmethod == 'FULLDSR') {
      this.showalltests = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmeasurementPage');
  }

  save() {
    this.log.info('AddMeasurementPage','save','Preparing save for: ' + this.aquariumid);
    let me = this;
    this.newmeasurement.tom = ""+Math.round(+new Date(this.newmeasurement.tom) / 1000);

    this.dsrData.addMeasurement(this.aquariumid, this.newmeasurement, this.newmeasurement.tom, function (result) {
      if (!me.checkForAtLeastOneMeasurement()) {
        me.log.debug('AddMeasurementPage','save','Should provide at least one measurement value');
        me.log.showAlert('Meetwaarden?', "Geef ten minste 1 meetwaarden op.", ['OK']);
        return;
      }
      if (result) {
        // Should reload aquariums after addMeasurement
        let loader = me.loadingCtrl.create({
            content: "Loading..."
        });
        me.log.debug('AddMeasurementPage','save','Loading Aquariums after addMeasurement');
        loader.present();
        me.dsrData.loadAquariums(function (err, result){
          loader.dismiss().catch(() => me.log.debug('AddMeasurementPage','save','Caught exception on dismiss()')); // https://github.com/ionic-team/ionic/issues/10046
          if (err) {
            me.log.debug('AddMeasurementPage','save',"LoadAquariums failed with error: " + err );
            me.log.showAlert('Loading failed', err, ['OK']);
          } else {
            me.log.debug('AddMeasurementPage','save','Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
            me.dsrData.aquariumkeys = Object.keys(me.dsrData.aquariums);
            me.log.showAlert('Opgeslagen', 'Meetwaarden zijn opgeslagen en daardoor heeft u steeds een geschiedenis van deze waarden beschikbaar.', ['OK']);
          }
          me.navCtrl.popToRoot();
        });
      } else {
        this.log.warning('AddMeasurementPage','save','addMeasurement returned unexpected result: ' + result);
      }
    })
  }

  checkForAtLeastOneMeasurement() {
    for (let item in this.newmeasurement) {
      if (item === "tom") continue;
      if (this.newmeasurement[item]) {
        return true;
      }
    }
    return false;
  }

  showInfo(parameter, measurement) {
    this.navCtrl.push(HelpdetailsPage, {"question": "Wat is "+parameter+"?"});
  }

}
