import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Addaquariumstep1Page } from '../addaquariumstep1/addaquariumstep1'
import { AquariumdetailsPage } from '../aquariumdetails/aquariumdetails';
import { SelectmethodPage } from '../selectmethod/selectmethod';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public aquariums = {};

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public dsrData: DsrDataProvider, public authService: AuthServiceProvider, public actionsheetCtrl: ActionSheetController, public platform: Platform, private log: LoggerServiceProvider, private translate: TranslateService) {
    let me = this;
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    this.log.debug('DashboardPage','constructor','Loading Dashboard');
    this.log.setAquarium({});
    loader.present();
    this.dsrData.loadAquariums(function (err, result){
      if (err) {
        me.log.debug('DashboardPage','constructor',"LoadAquariums failed with error: " + err );
        me.log.showAlert('Loading failed', err, ['OK']);
      } else {
        me.dsrData.aquariumkeys = Object.keys(me.dsrData.aquariums);
      }
      me.log.debug('DashboardPage','constructor','Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
      loader.dismiss().catch(() => me.log.debug('DashboardPage','constructor','Caught exception on dismiss()')); // https://github.com/ionic-team/ionic/issues/10046
    });
  }

  doRefresh(refresher) {
    let me = this;
    this.log.debug('DashboardPage','doRefresh','Begin async operation');
    this.dsrData.loadAquariums(function (err, result){
      if (err) {
        me.log.debug('DashboardPage','constructor',"LoadAquariums failed with error: " + err );
        me.log.showAlert('Loading failed', err, ['OK']);
      } else {
        me.log.debug('DashboardPage','doRefresh','Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
        me.dsrData.aquariumkeys = Object.keys(me.dsrData.aquariums);
      }
      refresher.complete();
    });
  }

  openMenu() {
    let me = this;
    this.translate.get(['DSR Actions', 'Logout', 'Close']).subscribe((translations: string) => {
      //console.log(res);
      let dashboardActions = this.actionsheetCtrl.create({
        title: translations['DSR Actions'],
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: translations['Logout'],
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'heart-outline' : null,
            handler: () => {
              me.logout();
            }
          },
          {
            text: translations['Close'],
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              me.log.debug('DashboardPage','openMenu','Cancel clicked');
            }
          }
        ]
      });
      dashboardActions.present();
    });
  }

  addaquariumstep1btn() {
    this.log.debug('DashboardPage','addaquariumstep1btn','Add aquarium');
    this.navCtrl.push(Addaquariumstep1Page)
  }
  aquariumDetails(aquaid) {
    this.log.debug('DashboardPage','aquariumDetails','Aquariumid: ' + aquaid);
    if (this.dsrData.aquariums[aquaid].DSRmethod == "UNKNOWN") {
      this.navCtrl.push(SelectmethodPage, {"aquariumid": aquaid});
    } else {
      this.navCtrl.push(AquariumdetailsPage, {"aquariumid": aquaid})
    }
  }

  logout() {
    let me = this;
    this.authService.logout(function (result) {
      if (!result) {
        me.log.error('DashboardPage','logout',"Logout of user failed");
      }
    })
  } 

}