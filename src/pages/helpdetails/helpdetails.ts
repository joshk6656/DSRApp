import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

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
  public question;// = {"q": "", "a": ""};
  public answer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dsrData: DsrDataProvider, private log: LoggerServiceProvider) {
    let me = this
    this.question = navParams.get("question");
    this.dsrData.getFAQanswer(this.question, function (answer) {
      console.log(answer)
      if (!answer) {
        me.answer = "Momenteel nog geen antwoord/informatie op deze vraag. Zelf aanvullen? Stuur een email met het antwoord naar app@dsrreefing.com ";
      } else {
        me.answer = answer;
      }
    });
  }

  ionViewDidLoad() {
    this.log.info('HelpdetailsPage','ionViewDidLoad','Page loaded');
  }

}
