import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//import { DashboardPage } from '../dashboard/dashboard';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
/**
 * Generated class for the AddmeasurementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddmeasurementPage = (function () {
    function AddmeasurementPage(navCtrl, navParams, alertCtrl, dsrData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.dsrData = dsrData;
        this.methodoptions = { "EZ": { "KH": true, "Ca": true, "NO3": true, "PO4": true } };
        this.showalltests = false;
        this.showphandsalinity = false;
        this.aquariumname = null;
        this.newmeasurement = {
            ph: null,
            salinity: null,
            kh: null,
            ca: null,
            mg: null,
            kalium: null,
            strontium: null,
            boor: null,
            jodide: null,
            po4: null,
            no3: null,
            no2: null,
            iron: null,
            tom: new Date().toISOString().slice(0, 10) // time of measurement
        };
        console.log("Building addMeasurement page");
        this.aquariumid = navParams.get("aquariumid");
        if (this.aquariumid) {
            this.aquariumname = this.dsrData.aquariums[this.aquariumid].name;
            //this.method = this.dsrData.aquariums[aquariumid].DSRmethod;
            this.measurementgoals = this.dsrData.measurementgoals; //this.dsrData.aquariums[aquariumid].targetvalues;
        }
        else {
            console.log("No aquarium provided?");
        }
        if (this.dsrData.aquariums[this.aquariumid].DSRmethod == 'FULLDSR') {
            this.showalltests = true;
        }
    }
    AddmeasurementPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddmeasurementPage');
        //console.log('Method:' + this.method )
    };
    AddmeasurementPage.prototype.save = function () {
        var me = this;
        console.log('Saving measurements for: ' + this.aquariumname);
        console.log("this.newmeasurement.tom: " + this.newmeasurement.tom);
        this.newmeasurement.tom = "" + Math.round(+new Date(this.newmeasurement.tom) / 1000);
        this.dsrData.addMeasurement(this.aquariumid, this.newmeasurement, function (result) {
            if (result) {
                var alert_1 = me.alertCtrl.create({
                    title: 'Opgeslagen',
                    subTitle: 'Meetwaarden zijn opgeslagen en daardoor heeft u steeds een geschiedenis van deze waarden beschikbaar.',
                    buttons: ['OK']
                });
                alert_1.present();
                me.navCtrl.popToRoot();
            }
            else {
                console.log("Something bad happened");
            }
        });
    };
    AddmeasurementPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-addmeasurement',
                    templateUrl: 'addmeasurement.html',
                },] },
    ];
    /** @nocollapse */
    AddmeasurementPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: AlertController, },
        { type: DsrDataProvider, },
    ]; };
    return AddmeasurementPage;
}());
export { AddmeasurementPage };
//# sourceMappingURL=addmeasurement.js.map