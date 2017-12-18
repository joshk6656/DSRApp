import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

import { DashboardPage } from '../../pages/dashboard/dashboard';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: []
})
export class HomePage {
  appVersion;
  enabledLogins = ["googleplus", "facebook"];

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private log: LoggerServiceProvider, public plt: Platform) {
    this.appVersion = this.log.version;
    if (this.plt.is('android')) {
      this.enabledLogins = ["facebook"];
    }
    this.log.setAquarium({});
    if (this.authService.isLoggedIn) {
      this.navCtrl.setRoot(DashboardPage);
    }
  }

  ionViewDidLoad() {
    this.log.info('Home','ionViewDidLoad','Page loaded');
  }

  fbLogin() {
    let me = this;
    this.log.info('Home','fbLogin','Clicked');
    this.authService.fblogin(function (result) {
      if (!result) {
        me.log.warning('Home','fbLogin','Facebook login failed');
      }
    });
  }

  googleLogin() {
    let me = this;
    this.log.info('Home','googleLogin','Clicked');
    this.authService.googleLogin(function (result) {
      if (!result) {
        me.log.warning('Home','fbLogin','Google login failed');
      }
    });
  }

  logout() {
    let me = this;
    this.log.info('Home','logout','Clicked');
    this.authService.logout(function (result) {
      if (!result) {
        me.log.error('Home','logout','Logout of user failed');
      }
    })
  } 

}