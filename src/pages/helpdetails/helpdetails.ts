import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-helpdetails',
  templateUrl: 'helpdetails.html',
})
export class HelpdetailsPage {
  public question = {"q": "", "a": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question = navParams.get("question");
    console.log(this.question);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpdetailsPage');
  }

}
