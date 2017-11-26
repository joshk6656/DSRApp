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

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  items;
  searcheditems;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.initializeItems();
  }

  initializeItems() {
    let me = this;
    
    this.http.get('assets/data/FAQ.json').map(res => res.json()).subscribe(function (data) {
      me.searcheditems = data
      me.items = data
    }, function(e){
      console.log("e");
      console.log(e);
    })
  }

  getItems(ev) {
    // Reset items back to all of the items
    //this.initializeItems();
    this.items = this.searcheditems;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.q.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  helpDetails(question) {
    console.log('Question: ' + question.q)
    this.navCtrl.push(HelpdetailsPage, {"question": question})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

}
