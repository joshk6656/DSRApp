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
var HomePage = (function () {
    /*user_displayName;
    user_uid;
    user_email;*/
    function HomePage(navCtrl, authService) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        if (this.authService.isLoggedIn) {
            this.navCtrl.setRoot(DashboardPage);
        }
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.fbLogin = function () {
        this.authService.fblogin(function (result) {
            if (!result) {
                console.log("Facebook login failed");
            }
        });
    };
    HomePage.prototype.logout = function () {
        this.authService.logout(function (result) {
            if (!result) {
                console.log("Logout of user failed");
            }
        });
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html',
                    providers: []
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = function () { return [
        { type: NavController, },
        { type: AuthServiceProvider, },
    ]; };
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map