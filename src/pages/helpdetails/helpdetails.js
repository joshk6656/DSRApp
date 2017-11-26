import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the HelpdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpdetailsPage = (function () {
    function HelpdetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.question = { "q": "", "a": "" };
        this.question = navParams.get("question");
        console.log(this.question);
    }
    HelpdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpdetailsPage');
    };
    HelpdetailsPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-helpdetails',
                    templateUrl: 'helpdetails.html',
                },] },
    ];
    /** @nocollapse */
    HelpdetailsPage.ctorParameters = function () { return [
        { type: NavController, },
        { type: NavParams, },
    ]; };
    return HelpdetailsPage;
}());
export { HelpdetailsPage };
//# sourceMappingURL=helpdetails.js.map