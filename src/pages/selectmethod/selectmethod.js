import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddmeasurementPage } from '../addmeasurement/addmeasurement';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the SelectmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectmethodPage = (function () {
    function SelectmethodPage(navCtrl, navParams, dsrData, authService, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dsrData = dsrData;
        this.authService = authService;
        this.http = http;
        //this.aquarium = navParams.get("aquarium");
        this.aquariumid = navParams.get("aquariumid");
    }
    SelectmethodPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectmethodPage Aquarium:' + JSON.stringify(this.aquariumid));
    };
    SelectmethodPage.prototype.selectMethod = function (method) {
        console.log('Method selected is ' + method);
        var me = this;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid }); //,'x-appversion':'1.0'});
        var options = new RequestOptions({ headers: headers });
        var params = {
            "method": method,
            "aquariumid": this.aquariumid
        };
        var urlSearchParams = new URLSearchParams();
        for (var keys in params) {
            urlSearchParams.append(keys, params[keys]);
        }
        var body = urlSearchParams.toString();
        console.log("Body: " + body);
        var jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/setmethod', body, options);
        jsonresponse.map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log('Aquarium add returned following data: ', JSON.stringify(data));
            me.dsrData.aquariums[me.aquariumid].DSRmethod = method;
            //this.dsrData.setDSRMethod(this.aquarium.name, method, function (result) {
            //if (result) {
            /*me.dsrData.loadAquariums(function (res) {
                        if (res) {*/
            me.navCtrl.push(AddmeasurementPage, { "aquariumid": me.aquariumid });
            /*}
                      });*/
            //}
            //});
        });
    };
    SelectmethodPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-selectmethod',
                    templateUrl: 'selectmethod.html',
                },] },
    ];
    /** @nocollapse */
    SelectmethodPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: DsrDataProvider, },
        { type: AuthServiceProvider, },
        { type: Http, },
    ]; };
    return SelectmethodPage;
}());
export { SelectmethodPage };
//# sourceMappingURL=selectmethod.js.map