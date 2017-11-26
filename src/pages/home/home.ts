import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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
  isLoggedIn;

  /*user_displayName;
  user_uid;
  user_email;*/

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider) {
    if (this.authService.isLoggedIn) {
      this.navCtrl.setRoot(DashboardPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  fbLogin() {
    this.authService.fblogin(function (result) {
      if (!result) {
        console.log("Facebook login failed");
      }
    });
  }

  logout() {
    this.authService.logout(function (result) {
      if (!result) {
        console.log("Logout of user failed");
      }
    })
  } 

}