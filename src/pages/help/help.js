import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { HelpdetailsPage } from '../helpdetails/helpdetails';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpPage = (function () {
    function HelpPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.initializeItems();
    }
    HelpPage.prototype.initializeItems = function () {
        var me = this;
        this.http.get('assets/data/FAQ.json').map(function (res) { return res.json(); }).subscribe(function (data) {
            me.searcheditems = data;
            me.items = data;
        }, function (e) {
            console.log("e");
            console.log(e);
        });
    };
    HelpPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        //this.initializeItems();
        this.items = this.searcheditems;
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.q.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HelpPage.prototype.helpDetails = function (question) {
        console.log('Question: ' + question.q);
        this.navCtrl.push(HelpdetailsPage, { "question": question });
    };
    HelpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpPage');
    };
    HelpPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-help',
                    templateUrl: 'help.html',
                },] },
    ];
    /** @nocollapse */
    HelpPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
        { type: Http, },
    ]; };
    return HelpPage;
}());
export { HelpPage };
//# sourceMappingURL=help.js.map