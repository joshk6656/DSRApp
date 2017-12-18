import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  
  openGit() {
    window.open("https://github.com/DSRReefing/DSRApp", '_system');
  }

}
