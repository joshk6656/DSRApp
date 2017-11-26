import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
//import { DashboardPage } from '../pages/dashboard/dashboard';
import { AngularFireAuth } from "angularfire2/auth";
//import * as firebase from 'firebase';
import { App } from 'ionic-angular';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, app, authService) {
        var _this = this;
        this.afAuth = afAuth;
        this.app = app;
        this.authService = authService;
        this.rootPage = HomePage;
        //, public navCtrl: NavController) {
        //let me = this;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            _this.afAuth.authState.subscribe(function (user) {
                if (!user) {
                    console.log("Logged out");
                    authService.user_displayName = null;
                    authService.user_uid = null;
                    authService.user_email = null;
                    authService.isLoggedIn = false;
                    _this.rootPage = HomePage;
                    //me.navCtrl.setRoot(HomePage);
                    //me.navCtrl.setRoot(HomePage);
                    _this.app.getRootNav().setRoot(_this.rootPage);
                    return;
                }
                authService.user_displayName = user.displayName;
                authService.user_email = user.email;
                authService.user_uid = user.uid;
                authService.isLoggedIn = true;
                _this.rootPage = TabsPage;
                //this.app.getRootNav().setRoot(TabsPage)
                //this.app.getRootNav().setRoot(this.rootPage);
                //this.app.setRoot(Login);
                console.log("Facebook authenticated: " + authService.user_displayName + " - " + authService.user_uid);
                //this.navCtrl.setRoot(HomePage);
                splashScreen.hide();
            });
        });
    }
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html',
                    providers: [AngularFireAuth]
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = function () { return [
        { type: Platform, },
        { type: StatusBar, },
        { type: SplashScreen, },
        { type: AngularFireAuth, },
        { type: App, },
        { type: AuthServiceProvider, },
    ]; };
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map