import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddmeasurementPage } from '../addmeasurement/addmeasurement';
import { AquariumdosingPage } from '../aquariumdosing/aquariumdosing';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the AquariumdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AquariumdetailsPage = (function () {
    function AquariumdetailsPage(navCtrl, loadingCtrl, navParams, dsrData) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.dsrData = dsrData;
        this.aquarium = { "measurements": [], "targetvalues": [], "name": "", "DSRmethod": "UNKNOWN" };
        this.nomeasurements = false;
        this.parameters = [];
        this.measurementsreverse = [];
        var me = this;
        this.aquariumid = navParams.get("aquariumid");
        this.aquarium = this.dsrData.aquariums[this.aquariumid];
        console.log("Print aquarium:");
        console.log(me.dsrData.aquariums[me.aquariumid]);
        console.log(this.aquarium);
        console.log(!me.dsrData.aquariums[me.aquariumid].hasOwnProperty("measurements"));
        //console.log(Object.keys(me.dsrData.aquariums[me.aquariumid]["measurements"]).length)
        if (!me.dsrData.aquariums[me.aquariumid].hasOwnProperty("measurements") || Object.keys(me.dsrData.aquariums[me.aquariumid]["measurements"]).length < 1) {
            var loader_1 = this.loadingCtrl.create({
                content: "Loading..."
            });
            console.log('Loading Details');
            loader_1.present();
            this.dsrData.loadMeasurements(this.aquariumid, function (result) {
                if (result) {
                    console.log('Aquarium measurements loaded: ' + JSON.stringify(me.dsrData.aquariums[me.aquariumid]["measurements"]));
                    if (!me.dsrData.aquariums[me.aquariumid]["measurements"]) {
                        me.dsrData.aquariums[me.aquariumid]["measurements"] = [];
                    }
                    else {
                        me.aquarium["measurements"] = me.dsrData.aquariums[me.aquariumid]["measurements"];
                    }
                }
                loader_1.dismiss();
                me.measurementsreverse = me.aquarium["measurements"]; //me.dsrData.aquariums[me.aquariumid]["measurements"]//this.dsrData.sortMeasurementsByKey(this.aquarium.measurements, "tom")//.reverse();
                me.parameters = Object.keys(me.dsrData.measurementgoals); //me.aquarium.targetvalues);
                console.log(me.measurementsreverse);
                me.printMessages();
            });
        }
        else {
            var measurements = [];
            for (var item in me.dsrData.aquariums[me.aquariumid]["measurements"]) {
                me.dsrData.aquariums[me.aquariumid]["measurements"][item]["key"] = item;
                measurements.push(me.dsrData.aquariums[me.aquariumid]["measurements"][item]);
            }
            dsrData.aquariums[me.aquariumid].measurements = measurements.reverse(); //data.message.measurements
            me.aquarium["measurements"] = me.dsrData.aquariums[me.aquariumid]["measurements"];
            me.measurementsreverse = me.aquarium["measurements"];
            me.parameters = Object.keys(me.dsrData.measurementgoals);
            me.printMessages();
        }
    }
    AquariumdetailsPage.prototype.printMessages = function () {
        var me = this;
        if (me.aquarium.measurements.length < 1) {
            me.nomeasurements = true;
        }
        else {
            for (var measurement in me.aquarium.measurements) {
                var targets = me.dsrData.measurementgoals;
                me.aquarium.measurements[measurement].readabletom = new Date(me.aquarium.measurements[measurement].tom * 1000).toISOString().slice(0, 10);
                for (var value in me.aquarium.measurements[measurement]) {
                    console.log("measurement: " + value);
                    if (value === "aquariumid")
                        continue;
                    //console.log(me.aquarium.targetvalues)
                    //console.log(me.dsrData.measurementranges)
                    if (me.aquarium.measurements[measurement][value] > targets[value] && me.aquarium.measurements[measurement][value] > me.dsrData.measurementranges[value][1]) {
                        me.aquarium.measurements[measurement][value + "status"] = "high";
                    }
                    else if (me.aquarium.measurements[measurement][value] < targets[value] && me.aquarium.measurements[measurement][value] < me.dsrData.measurementranges[value][0]) {
                        me.aquarium.measurements[measurement][value + "status"] = "low";
                    }
                    else if (me.aquarium.measurements[measurement][value] > targets[value]) {
                        me.aquarium.measurements[measurement][value + "status"] = "ok";
                    }
                    else if (me.aquarium.measurements[measurement][value] < targets[value]) {
                        me.aquarium.measurements[measurement][value + "status"] = "ok";
                    }
                    else if (me.aquarium.measurements[measurement][value] == targets[value]) {
                        me.aquarium.measurements[measurement][value + "status"] = "perfect";
                    }
                }
                console.log(me.aquarium.measurements);
            }
            console.log(me.aquarium);
        }
    };
    AquariumdetailsPage.prototype.doRefresh = function (refresher) {
        var me = this;
        console.log('Begin async operation', refresher);
        this.dsrData.loadMeasurements(this.aquariumid, function (result) {
            if (result) {
                console.log('Aquarium measurements loaded: ' + JSON.stringify(me.dsrData.aquariums[me.aquariumid]["measurements"]));
                if (!me.dsrData.aquariums[me.aquariumid]["measurements"]) {
                    me.dsrData.aquariums[me.aquariumid]["measurements"] = [];
                }
                else {
                    me.aquarium["measurements"] = me.dsrData.aquariums[me.aquariumid]["measurements"];
                }
            }
            me.measurementsreverse = me.aquarium["measurements"]; //me.dsrData.aquariums[me.aquariumid]["measurements"]//this.dsrData.sortMeasurementsByKey(this.aquarium.measurements, "tom")//.reverse();
            me.parameters = Object.keys(me.dsrData.measurementgoals); //me.aquarium.targetvalues);
            console.log(me.measurementsreverse);
            me.printMessages();
            refresher.complete();
        });
    };
    AquariumdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AquariumdetailsPage');
    };
    AquariumdetailsPage.prototype.addMeasurements = function () {
        console.log('addMeasurements triggered for: ' + this.aquarium.name);
        this.navCtrl.push(AddmeasurementPage, { "aquariumid": this.aquariumid });
    };
    AquariumdetailsPage.prototype.checkDosings = function () {
        this.navCtrl.push(AquariumdosingPage, { "aquariumid": this.aquariumid });
    };
    AquariumdetailsPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-aquariumdetails',
                    templateUrl: 'aquariumdetails.html',
                },] },
    ];
    /** @nocollapse */
    AquariumdetailsPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: LoadingController, },
        { type: NavParams, },
        { type: DsrDataProvider, },
    ]; };
    return AquariumdetailsPage;
}());
export { AquariumdetailsPage };
//# sourceMappingURL=aquariumdetails.js.map