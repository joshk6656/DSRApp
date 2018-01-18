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

import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth, private app:App, public authService: AuthServiceProvider, private log: LoggerServiceProvider, private translateService: TranslateService, private globalization: Globalization) {//, public navCtrl: NavController) {
    let me = this;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.globalization.getPreferredLanguage()
      .then(res => me.log.info('AppComponents','constructor',"getPreferredLanguage returned: " + JSON.stringify(res)))
      .catch(function (e) {
        if (e != "cordova_not_available") {
          me.log.error('AppComponents','constructor',"ERROR CATCHED: getPreferredLanguage returned: " + JSON.stringify(e));
        }
      });

      me.translateService.setDefaultLang('en');
      me.translateService.use('nl');

      this.afAuth.authState.subscribe(user => {
        if (!user) {
          this.log.info('AppComponents','afAuth.authState.subscribe','Logged out');
          authService.user_displayName = null;
          authService.user_uid = null;
          authService.user_email = null;
          //authService.user_birthday = null;
          //authService.user_name = null;
          authService.isLoggedIn = false;
          me.log.setUser({"isLoggedIn": false});
          this.rootPage = HomePage;
          //me.navCtrl.setRoot(HomePage);
          this.app.getRootNav().setRoot(this.rootPage);
          return;
        }
        authService.user_displayName = user.displayName;
        authService.user_email = user.email;
        authService.user_uid = user.uid;
        //authService.user_birthday = user.birthday;
        //authService.user_name = user.name;
        me.log.setUser({"uid": user.uid, "displayName": user.displayName, "isLoggedIn": true});
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
