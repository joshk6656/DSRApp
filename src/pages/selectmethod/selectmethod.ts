import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddmeasurementPage } from '../addmeasurement/addmeasurement';
import { AquariumdetailsPage } from '../aquariumdetails/aquariumdetails';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SelectmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-selectmethod',
  templateUrl: 'selectmethod.html',
})
export class SelectmethodPage {
  aquariumid;
  navigateTo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider, public authService: AuthServiceProvider) {
    this.aquariumid = navParams.get("aquariumid");
    this.navigateTo = navParams.get("navigateTo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectmethodPage Aquarium:'+JSON.stringify(this.aquariumid));
  }
  
  selectMethod(method) {
    console.log('Method selected is ' + method)
    let me = this;
    this.dsrData.setDSRMethod(me.aquariumid, method, function (result) {
      if (result) {
        if (me.navigateTo && me.navigateTo === "Details") {
          me.navCtrl.push(AquariumdetailsPage, {"aquariumid": me.aquariumid});
        } else {
          me.navCtrl.push(AddmeasurementPage, {"aquariumid": me.aquariumid});
        }
      } else {
        console.log("setMethod failed");
      }
    });
  }

}
