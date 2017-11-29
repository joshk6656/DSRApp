import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoggerServiceProvider } from '../providers/logger-service/logger-service';
//import { NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
//import { DashboardPage } from '../pages/dashboard/dashboard';

import { AngularFireAuth } from "angularfire2/auth";
//import * as firebase from 'firebase';
import { App } from 'ionic-angular';


@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth, private app:App, public authService: AuthServiceProvider, private log: LoggerServiceProvider) {//, public navCtrl: NavController) {
    //let me = this;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();


      this.afAuth.authState.subscribe(user => {
        if (!user) {
          this.log.info('AppComponents','afAuth.authState.subscribe','Logged out');
          authService.user_displayName = null;
          authService.user_uid = null;
          authService.user_email = null
          authService.isLoggedIn = false;
          this.rootPage = HomePage;
          //me.navCtrl.setRoot(HomePage);
          this.app.getRootNav().setRoot(this.rootPage);
          return;
        }
        authService.user_displayName = user.displayName;
        authService.user_email = user.email;
        authService.user_uid = user.uid;
        authService.isLoggedIn = true;
        this.rootPage = TabsPage;
        //this.app.getRootNav().setRoot(TabsPage)
        //this.app.getRootNav().setRoot(this.rootPage);
        //this.app.setRoot(Login);
        this.log.info('AppComponents','afAuth.authState.subscribe',"Authenticated: " + authService.user_displayName + " - " + authService.user_uid);
        //this.navCtrl.setRoot(HomePage);
        splashScreen.hide();
      });

    });
  }
}
