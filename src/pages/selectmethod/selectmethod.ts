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

@Component({
  selector: 'page-selectmethod',
  templateUrl: 'selectmethod.html',
})
export class SelectmethodPage {
  //aquarium = {DSRmethod: "UNKNOWN", name: "EMPTY"};
  aquariumid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider, public authService: AuthServiceProvider, public http: Http) {
    //this.aquarium = navParams.get("aquarium");
    this.aquariumid = navParams.get("aquariumid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectmethodPage Aquarium:'+JSON.stringify(this.aquariumid));
  }
  
  selectMethod(method) {
    console.log('Method selected is ' + method)
    let me = this;



    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let params = {
      "method": method,
      "aquariumid": this.aquariumid
    };
    let urlSearchParams = new URLSearchParams();		
    for(let keys in params){
      urlSearchParams.append(keys, params[keys]);
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/setmethod', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium add returned following data: ', JSON.stringify(data));

      me.dsrData.aquariums[me.aquariumid].DSRmethod = method
      //this.dsrData.setDSRMethod(this.aquarium.name, method, function (result) {
        //if (result) {
          /*me.dsrData.loadAquariums(function (res) {
            if (res) {*/
              me.navCtrl.push(AddmeasurementPage, {"aquariumid": me.aquariumid});
            /*}
          });*/
        //}
      //});
    })
  }

}
