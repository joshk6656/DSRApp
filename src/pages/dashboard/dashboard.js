import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Addaquariumstep1Page } from '../addaquariumstep1/addaquariumstep1';
import { AquariumdetailsPage } from '../aquariumdetails/aquariumdetails';
import { SelectmethodPage } from '../selectmethod/selectmethod';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Platform, ActionSheetController } from 'ionic-angular';
var DashboardPage = (function () {
    function DashboardPage(navCtrl, loadingCtrl, dsrData, authService, actionsheetCtrl, platform) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dsrData = dsrData;
        this.authService = authService;
        this.actionsheetCtrl = actionsheetCtrl;
        this.platform = platform;
        this.aquariums = {};
        this.aquariumkeys = [];
        var me = this;
        var loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        console.log('Loading Dashboard');
        loader.present();
        this.dsrData.loadAquariums(function (result) {
            if (result) {
                console.log('Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
                me.aquariumkeys = Object.keys(me.dsrData.aquariums);
            }
            loader.dismiss();
        });
    }
    DashboardPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var me = this;
        this.dsrData.loadAquariums(function (result) {
            if (result) {
                console.log('Aquariums loaded: ' + JSON.stringify(me.dsrData.aquariums));
                me.aquariumkeys = Object.keys(me.dsrData.aquariums);
            }
            refresher.complete();
        });
    };
    DashboardPage.prototype.openMenu = function () {
        var me = this;
        var dashboardActions = this.actionsheetCtrl.create({
            title: 'DSR Acties',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Afmelden',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: function () {
                        console.log('Logout clicked');
                        me.logout();
                    }
                },
                {
                    text: 'Sluiten',
                    role: 'cancel',
                    // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        dashboardActions.present();
    };
    DashboardPage.prototype.addaquariumstep1btn = function () {
        console.log('Test');
        this.navCtrl.push(Addaquariumstep1Page);
    };
    DashboardPage.prototype.aquariumDetails = function (aquaid) {
        console.log('Aquariumid: ' + aquaid);
        if (this.dsrData.aquariums[aquaid].DSRmethod == "UNKNOWN") {
            this.navCtrl.push(SelectmethodPage, { "aquariumid": aquaid });
        }
        else {
            this.navCtrl.push(AquariumdetailsPage, { "aquariumid": aquaid });
        }
    };
    DashboardPage.prototype.logout = function () {
        this.authService.logout(function (result) {
            if (!result) {
                console.log("Logout of user failed");
            }
        });
    };
    DashboardPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-dashboard',
                    templateUrl: 'dashboard.html',
                },] },
    ];
    /** @nocollapse */
    DashboardPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: LoadingController, },
        { type: DsrDataProvider, },
        { type: AuthServiceProvider, },
        { type: ActionSheetController, },
        { type: Platform, },
    ]; };
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map