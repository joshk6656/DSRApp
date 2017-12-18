import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HelpdetailsPage } from '../helpdetails/helpdetails';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

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
  faqitems;
  faqsearcheditems;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dsrData: DsrDataProvider, private log: LoggerServiceProvider) {
    let me = this;
    this.log.setAquarium({});
    this.dsrData.loadFAQItems(function (res) {
      if (res) {
        me.log.debug('Help','constructor',"loadFAQItems done.");
        me.faqitems = me.dsrData.faqitems;
        me.faqsearcheditems = me.dsrData.faqsearcheditems;
      } else {
        me.log.error('Help','constructor',"loadFAQItems failed.");
      }
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.faqitems = this.faqsearcheditems;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.faqitems = this.faqitems.filter((item) => {
        return (item.q.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  helpDetails(question) {
    this.log.debug('Help','helpDetails','Question: ' + question.q);
    this.navCtrl.push(HelpdetailsPage, {"question": question.q})
  }

  ionViewDidLoad() {
    this.log.info('Help','ionViewDidLoad','Page loaded');
  }

  openFB() {
    window.open("https://www.facebook.com/groups/DSRProductSupport/", '_system');
  }

}
