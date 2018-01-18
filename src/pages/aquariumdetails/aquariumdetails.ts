import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';

import { AddmeasurementPage } from '../addmeasurement/addmeasurement';
import { AquariumdosingPage } from '../aquariumdosing/aquariumdosing';
import { SelectmethodPage } from '../selectmethod/selectmethod';
import { Addaquariumstep1Page } from '../addaquariumstep1/addaquariumstep1';
import { HelpdetailsPage } from '../helpdetails/helpdetails';
import { AddEventPage } from '../addevent/addevent';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';


/**
 * Generated class for the AquariumdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aquariumdetails',
  templateUrl: 'aquariumdetails.html',
})
export class AquariumdetailsPage {
  public aquarium = {"measurements": [], "targetvalues": [], "name": "", "DSRmethod": "UNKNOWN", "events": []};
  nomeasurements = false;
  parameters = [];
  public measurements = [];
  public aquariumid;
  public timelineevents = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private dsrData: DsrDataProvider, public actionsheetCtrl: ActionSheetController, public platform: Platform, private log: LoggerServiceProvider, private alertCtrl: AlertController) {
    let me = this;
    this.aquariumid = navParams.get("aquariumid");
    this.log.debug('AquariumdetailsPage','constructor','Loading aquariumid: ' + this.aquariumid);
    this.aquarium = this.dsrData.aquariums[this.aquariumid];
    this.log.setAquarium(this.aquarium);
    this.log.debug('AquariumdetailsPage','constructor','Aquarium: ' + this.aquarium);
    me.parameters = Object.keys(me.dsrData.measurementgoals);
    me.generateTimeline(me.aquariumid);
    me.printMeasurements();
    me.printEvents();
  }

  generateTimeline(aquariumid) {
    let me = this;
    me.measurements = me.dsrData.getMeasurements(aquariumid);
    let events = me.dsrData.getEvents(aquariumid);
    me.timelineevents = me.measurements.concat(events);
    console.log(me.timelineevents);
    this.dsrData.sortMeasurementsByKey(me.timelineevents, "key", true); 
  }

  openMenu() {
    let me = this;
    let dashboardActions = this.actionsheetCtrl.create({
      title: 'Aquarium Acties',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Wijzig DSR Methode',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Edit DSR Method');
            me.navCtrl.push(SelectmethodPage, {"aquariumid": this.aquariumid, "navigateTo": "Details"});
          }
        },
        {
          text: 'Wijzig Aquarium',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Edit Aquarium');
            me.navCtrl.push(Addaquariumstep1Page, {"aquariumid": this.aquariumid, "navigateTo": "Details"});
          }
        },
        {
          text: 'Verwijderen',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log("Delete Aquarium triggered");
            let alert = this.alertCtrl.create({
              title: 'Confirm Removal',
              message: 'Are you sure you want to delete the aquarium and all its information (inreversable)?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked on confirm removal');
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    console.log('Confirm Removal clicked');
                    me.deleteAquarium();
                    me.navCtrl.popToRoot()
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: 'Sluiten',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    dashboardActions.present();
  }

  deleteAquarium() {
    let me = this;
    this.dsrData.deleteAquarium(this.aquariumid, function (result){
      if (result) {
        me.log.debug('AquariumdetailsPage','deleteAquarium','Removed aquarium: ' + me.aquariumid);
      } else {
        me.log.warning('AquariumdetailsPage','deleteAquarium','Could not remove aquarium: ' + me.aquariumid);
      }
    });
  }

  printEvents() {
    let me = this;
      for (let event in me.aquarium.events) {
        me.aquarium.events[event].readabletom = new Date(Number(me.aquarium.events[event]["key"]) * 1000).toISOString().slice(0,10)
        console.log(me.aquarium.events[event].readabletom);
      }
  }

  printMeasurements() {
    let me = this;
    if (!me.aquarium.hasOwnProperty("measurements") || me.aquarium.measurements.length < 1) {
      me.nomeasurements = true;
    } else {
      for (let measurement in me.aquarium.measurements) {
        let targets = me.dsrData.measurementgoals
        if (!me.aquarium.measurements[measurement].hasOwnProperty("key") || me.aquarium.measurements[measurement]["key"] === "NaN") {
          me.log.error('AquariumdetailsPage','printMeasurements','Key missing for: ' + JSON.stringify(me.aquarium.measurements[measurement]));
        }
        me.aquarium.measurements[measurement].readabletom = new Date(Number(me.aquarium.measurements[measurement]["key"]) * 1000).toISOString().slice(0,10)
        console.log(me.aquarium.measurements[measurement].readabletom);
        for (let value in me.aquarium.measurements[measurement]) {
          console.log("measurement: " + value);
          if (value === "aquariumid") continue;
          //console.log(me.aquarium.targetvalues)
          //console.log(me.dsrData.measurementranges)
          if (me.aquarium.measurements[measurement][value] > targets[value] && me.aquarium.measurements[measurement][value] > me.dsrData.measurementranges[value][1]) {
            me.aquarium.measurements[measurement][value+"status"] = "high"; 
          } else if (me.aquarium.measurements[measurement][value] < targets[value] && me.aquarium.measurements[measurement][value] < me.dsrData.measurementranges[value][0]) {
            me.aquarium.measurements[measurement][value+"status"] = "low"; 
          } else if (me.aquarium.measurements[measurement][value] > targets[value]) {
            me.aquarium.measurements[measurement][value+"status"] = "ok"; 
          } else if (me.aquarium.measurements[measurement][value] < targets[value]) {
            me.aquarium.measurements[measurement][value+"status"] = "ok"; 
          } else if (me.aquarium.measurements[measurement][value] == targets[value]) {
            me.aquarium.measurements[measurement][value+"status"] = "perfect"; 
          }
        }
        console.log(me.aquarium.measurements)
      }
      console.log(me.aquarium)
    }
  }

  doRefresh(refresher) {
    let me = this;
    console.log('Begin async operation', refresher);

    this.dsrData.loadMeasurements(this.aquariumid, function (result){
      if (result) {
        console.log('Aquarium measurements loaded: ' + JSON.stringify(me.dsrData.aquariums[me.aquariumid]["measurements"]))
        if (!me.dsrData.aquariums[me.aquariumid]["measurements"]) {
          me.dsrData.aquariums[me.aquariumid]["measurements"] = []
        } else {
          let measurements = me.dsrData.getMeasurements(me.aquariumid);
          me.aquarium["measurements"] = measurements;//me.dsrData.aquariums[me.aquariumid]["measurements"]
        }
      }
      me.measurements= me.aquarium["measurements"]//.reverse()//me.dsrData.aquariums[me.aquariumid]["measurements"]//this.dsrData.sortMeasurementsByKey(this.aquarium.measurements, "tom")//.reverse();
      me.parameters = Object.keys(me.dsrData.measurementgoals);//me.aquarium.targetvalues);
      //console.log(me.measurementsreverse )
      me.printMeasurements()
      refresher.complete();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AquariumdetailsPage');
  }
  addInfo() {
    /*console.log('addMeasurements triggered for: ' + this.aquarium.name)
    this.navCtrl.push(AddmeasurementPage, {"aquariumid": this.aquariumid});*/
    let me = this;
    let addInfoActions = this.actionsheetCtrl.create({
      title: 'Toevoegen',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Gebeurtenis toevoegen',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Add Aquarium Event for: ' + this.aquarium.name);
            me.navCtrl.push(AddEventPage, {"aquariumid": this.aquariumid});
          }
        },
        {
          text: 'Metingen toevoegen',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Add Aquarium Measurements for: ' + this.aquarium.name);
            me.navCtrl.push(AddmeasurementPage, {"aquariumid": this.aquariumid});
          }
        },
        {
          text: 'Sluiten',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    addInfoActions.present();
  }
  checkDosings() {
    this.navCtrl.push(AquariumdosingPage, {"aquariumid": this.aquariumid});
  }
  showInfo(parameter, measurement) {
    this.navCtrl.push(HelpdetailsPage, {"question": "Wat is "+parameter+"?"});
  }

}
