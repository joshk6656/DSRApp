import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddEventPage {
  event = {"toe": new Date().toISOString().slice(0,10), "description": ""}
  aquariumname: String = null;
  aquariumid;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private dsrData: DsrDataProvider, private log: LoggerServiceProvider) {
    this.aquariumid= navParams.get("aquariumid");
    this.log.info('AddEventPage','constructor','Preparing Event Page for aquariumid: ' + this.aquariumid);
    if (this.aquariumid) {
      this.aquariumname = this.dsrData.aquariums[this.aquariumid].name;
      //this.measurementgoals = this.dsrData.measurementgoals;
    } else {
      this.log.warning('AddEventPage','constructor','No aquariumid provided?');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  save() {
    this.log.info('AddEventPage','save','Preparing save for: ' + this.aquariumid);
    let me = this;
    this.event.toe = ""+Math.round(+new Date(this.event.toe) / 1000);
    this.dsrData.addEvent(this.aquariumid, this.event, function (result) {
      if (me.event.description === "") {
        me.log.debug('AddEventPage','save','No description provided.');
        me.log.showAlert('Omschrijving?', "Gelieve een omschrijving op te geven.", ['OK']);
        return;
      }
      if (result) {
        // Should reload aquariums after addMeasurement
        let loader = me.loadingCtrl.create({
            content: "Loading..."
        });
        me.log.debug('AddEventPage','save','Loading Aquariums after addEvent');
        loader.present();
        me.dsrData.loadAquariums(function (err, result){
          loader.dismiss().catch(() => me.log.debug('AddEventPage','save','Caught exception on dismiss()')); // https://github.com/ionic-team/ionic/issues/10046
          if (err) {
            me.log.debug('AddEventPage','save',"LoadAquariums failed with error: " + err );
            me.log.showAlert('Loading failed', err, ['OK']);
          } else {
            me.log.debug('AddEventPage','save','Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
            me.dsrData.aquariumkeys = Object.keys(me.dsrData.aquariums);
            me.log.showAlert('Opgeslagen', 'Gebeurtenis is opgeslagen.', ['OK']);
          }
          me.navCtrl.popToRoot();
        });
      } else {
        me.log.warning('AddEventPage','save','add Event returned unexpected result: ' + result);
      }
    })
  }
}
