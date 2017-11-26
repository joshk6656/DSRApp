import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Addaquariumstep1Page } from '../addaquariumstep1/addaquariumstep1'
import { AquariumdetailsPage } from '../aquariumdetails/aquariumdetails';
import { SelectmethodPage } from '../selectmethod/selectmethod';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public aquariums = {};
  public aquariumkeys = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private dsrData: DsrDataProvider, public authService: AuthServiceProvider, public actionsheetCtrl: ActionSheetController, public platform: Platform) {
    let me = this;
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    console.log('Loading Dashboard')
    loader.present();
    this.dsrData.loadAquariums(function (result){
      if (result) {
        console.log('Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums))
        me.aquariumkeys = Object.keys(me.dsrData.aquariums);
      }
      loader.dismiss();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    let me = this;
    this.dsrData.loadAquariums(function (result){
      if (result) {
        console.log('Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums))
        me.aquariumkeys = Object.keys(me.dsrData.aquariums);
      }
      refresher.complete();
    });
  }

  openMenu() {
    let me = this;
    let dashboardActions = this.actionsheetCtrl.create({
      title: 'DSR Acties',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Afmelden',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Logout clicked');
            me.logout();
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

  addaquariumstep1btn() {
    console.log('Test')
    this.navCtrl.push(Addaquariumstep1Page)
  }
  aquariumDetails(aquaid) {
    console.log('Aquariumid: ' + aquaid)
    if (this.dsrData.aquariums[aquaid].DSRmethod == "UNKNOWN") {
      this.navCtrl.push(SelectmethodPage, {"aquariumid": aquaid});
    } else {
      this.navCtrl.push(AquariumdetailsPage, {"aquariumid": aquaid})
    }
  }

  logout() {
    this.authService.logout(function (result) {
      if (!result) {
        console.log("Logout of user failed");
      }
    })
  } 

}