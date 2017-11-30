import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the DsrDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DsrDataProvider {

  public aquariums = {}
  public aquariumkeys = []

  public measurementgoals = {
    ph: 8.1,
    salinity: 35,
    kh: 9,
    ca: 440,
    mg: 1350,
    kalium: 390,
    strontium: 8,
    boor: 4.4,
    jodide: 0.06,
    po4: 0.04,
    no3: 2,
    no2: 0,
    iron: 0.15
  }

  public measurementranges = {
    ph: [7.95, 8.2],
    salinity: [33, 34],
    kh: [7, 9],
    ca: [420, 460],
    mg: [1300, 1400],
    kalium: [380, 420],
    strontium: [3, 10],
    boor: [3.5, 4,4],
    jodide: [0.06, 0.06],
    po4: [0.04, 0.08],
    no3: [1, 3],
    no2: [0, 0],
    iron: [0.01, 0.15]
  }

  public controlparameters = {
    "EZ": ["salinity", "kh", "ca", "no3"],
    "FULLDSR": [ "salinity", "kh", "ca", "mg", "kalium", "strontium", "boor", "jodide", "po4", "no3", "iron"]
  }

  public aquariumObject = {
    name: "Glenn's aquarium",
    DSRmethod: "UNKNOWN",
    occupation: "EMPTY",
    location: "",
    country: "NL",
    aquarium_lngth: 0.00,
    aquarium_width: 0.00,
    aquarium_waterheight: 0.00,
    sump_lngth: 0.00,
    sump_width: 0.00,
    sump_waterheight: 0.00,
    sump_active: false,
    refugium_lngth: 0.00,
    refugium_width: 0.00,
    refugium_waterheight: 0.00,
    refugium_active: false,
    de_rockformation: 0.00,
    de_rockformationtype: "natureocean",
    de_rockformationcustomfactor: 0.75,
    de_sandvolumetype: "coralsand0510dry",
    de_sandvolume: 0.00,
    de_sandvolumecustomfactor: 0.75,
    detailedestimation_active: true,
    totalwatervolume: 0.00//,
    //targetvalues: this.measurementgoals,
    //measurements: [],
    //dosings: {}
  }

  dosingcorrections = {
    "EZ": {
      "kh": {
        "correctionfactor": 0.167,
        "correctiontype": "ml"
      },
      "ca": {
        "correctionfactor": 0.00578,
        "correctiontype": "ml"
      },
      "no3": {
        "correctionfactor": 7,
        "correctiontype": "%",
        "reverseddosing": true
      },
      "mg": {
        "correctionfactor": 0.00289,
        "correctiontype": "ml"
      }
    },
    "FULLDSR": {
      "salinity": {
        "correctionfactor": 100/100,
        "correctiontype": "g"
      },
      "kh": {
        "correctionfactor": 3/100,
        "correctiontype": "g"
      },
      "ca": {
        "correctionfactor": 0.3668/100,
        "correctiontype": "g"
      },
      "no3": {
        "correctionfactor": 7/100,
        "correctiontype": "%",
        "reverseddosing": true
      },
      /*"po4": {
        "correctionfactor": 7,
        "correctiontype": "%",
        "reverseddosing": true
      },*/
      "po4": {
        "correctionfactor": 10/100,
        "correctiontype": "ml"
      },
      "mg": {
        "correctionfactor": 0.836/100,
        "correctiontype": "g"
      },
      "kalium": {
        "correctionfactor": 0.667/100,
        "correctiontype": "ml"
      },
      "strontium": {
        "correctionfactor": 3.04/100,
        "correctiontype": "ml"
      },
      "boor": {
        "correctionfactor": 12.68/100,
        "correctiontype": "ml"
      },
      "jodide": {
        "correctionfactor": 26/100,
        "correctiontype": "ml"
      },
      "mangaan": {
        "correctionfactor": 1/100,
        "correctiontype": "ml"
      },
      "iron": {
        "correctionfactor": 0.4975/100,
        "correctiontype": "ml"
      }
    }
  }

  dosings = {
    "EZ": {
      "EMPTY": {
        "kh": {"productname": "EZ-Buffer", "dosing": 0.00, "unit": "ml" },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.00, "unit": "ml" },
        "no3": {"productname": "EZ-Carbon", "dosing": 1.00, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.00, "unit": "ml" }
      },
      "LOW": {
        "kh": {"productname": "EZ-Buffer", "dosing": 2.00, "unit": "ml" },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.4, "unit": "ml"  },
        "no3": {"productname": "EZ-Carbon", "dosing": 1.50, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.2, "unit": "ml" }
      },
      "MID": {
        "kh": {"productname": "EZ-Buffer", "dosing": 4.00, "unit": "ml"  },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.8, "unit": "ml" },
        "no3": {"productname": "EZ-Carbon", "dosing": 2.00, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.4, "unit": "ml" }
      },
      "HIGH": {
        "kh": {"productname": "EZ-Buffer", "dosing": 4.00, "unit": "ml" },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.8, "unit": "ml" },
        "no3": {"productname": "EZ-Carbon", "dosing": 2.00, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.4, "unit": "ml" }
      }
    },
    "FULLDSR": {
      "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"},
      "kh": {"productname": "KH+", "dosing": 0.00, "unit": "g"},
      "ca": {"productname": "Ca+", "dosing": 0.00, "unit": "g"},
      "mg": {"productname": "Mg+", "dosing": 0.00, "unit": "g"},
      "kalium": {"productname": "K+", "dosing": 0.00, "unit": "g"},
      "strontium": {"productname": "Sr+", "dosing": 0.00, "unit": "g"},
      "boor": {"productname": "B+", "dosing": 0.00, "unit": "g"},
      "jodide": {"productname": "I+", "dosing": 0.00, "unit": "g"},
      "mangaan": {"productname": "Mn+", "dosing": 0.00, "unit": "g"},
      "no3": {"productname": "CarbonVS", "dosing": 1.00, "unit": "g"},
      //"po4": {"productname": "Fe+", "dosing": 0.00, "unit": "g"},
      "po4": {"productname": "PO4+", "dosing": 0.00, "unit": "g"},
      "iron": {"productname": "Fe+", "dosing": 0.00, "unit": "g"}
    }
  }

  results: string[];
  
  constructor(public http: Http, public authService: AuthServiceProvider, public alertController : AlertController) {
    console.log('Hello DsrDataProvider Provider');
  }

  displayAlert(value,title)
  {
      let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
                    {
                        text: "OK"
                    }
               ]
      });
      coolAlert.present();
 
  }

  loadAquariums(cb) {
    let me = this;

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let jsonresponse = me.http.get('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/list', options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Data returned list of aquariums: ', JSON.stringify(data.message.list));
      if (data.message.list !== null) {
        me.aquariums = data.message.list
        me.aquariumkeys = Object.keys(me.aquariums)
      } else {
        me.aquariums = []
      }
      cb(true);
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      me.displayAlert(err, "loadAquariums  failed")
      cb(false)
    });
  }

  loadMeasurements(aquariumid, cb) {
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let jsonresponse = me.http.get('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/measurements?key=' + encodeURIComponent(aquariumid), options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log("Response:" + JSON.stringify(data))
      console.log('Data returned list of measurements: ', JSON.stringify(data.message.measurements));
      let measurements = []
      for (let item in data.message.measurements) {
        data.message.measurements[item]["key"] = item
        measurements.push(data.message.measurements[item])
      }
      me.aquariums[aquariumid].measurements = measurements.reverse()//data.message.measurements
      cb(true);
    })
  }

  checkOnTarget(key, value) {
    if (this.measurementgoals[key] == value) {
      //console.log(key+" on target with value: " + value)
      return 0;
    } else if (value > this.measurementgoals[key]) {
      //console.log(key+" above target with value: " + value)
      return this.measurementgoals[key] - value;
    } else if (value < this.measurementgoals[key]) {
      //console.log(key+" below target with value: " + value)
      return this.measurementgoals[key] - value;
    }
  }

  addAquarium(aqua, cb) {

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let params = aqua;
    let urlSearchParams = new URLSearchParams();		
    for(let keys in params){
      urlSearchParams.append(keys, params[keys]);
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = this.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/add', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium add returned following data: ', JSON.stringify(data));
      let aquaid = data.message.aquariumid
      this.aquariums[aquaid] = aqua;
      this.aquariumkeys = Object.keys(this.aquariums)
      cb(aquaid)
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      this.displayAlert(err, "addAquarium  failed")
      cb(false)
    });
  }

  setDSRMethod(aquariumid, method, cb){
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let params = {
      "method": method,
      "aquariumid": aquariumid
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
      let occupation = me.aquariums[aquariumid].occupation
      me.aquariums[aquariumid].DSRmethod = method
      if (this.dosings.hasOwnProperty(method)) {
        me.aquariums[aquariumid].dosings = this.dosings[method][occupation]
      } else {
        console.log("Cannot set dosings, DSR method not configured");
      }
      cb(true)
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      this.displayAlert(err, "addAquarium  failed")
      cb(false)
    });
  }

  deleteAquarium(aquariumid, cb) {
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
    let options = new RequestOptions({ headers: headers });
    let params = {
      "aquariumid": aquariumid
    };
    let urlSearchParams = new URLSearchParams();		
    for(let keys in params){
      urlSearchParams.append(keys, params[keys]);
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/delete', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium delete returned following data: ', JSON.stringify(data));
      //let occupation = me.aquariums[aquariumid].occupation
      console.log(me.aquariums)
      delete me.aquariums[aquariumid]
      this.aquariumkeys = Object.keys(this.aquariums)
      cb(true)
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      this.displayAlert(err, "deleteAquarium  failed")
      cb(false)
    });
  }

  getAquarium(aquaname) {
    for (let i in this.aquariums) {
      if (this.aquariums[i].name == aquaname) {
        return this.aquariums[i];
      }
    }
    return false;
  }

  addMeasurement(aquariumid, newmeasurement, cb) {
    console.log("addMeasurement triggered for: " + aquariumid)
    console.log(this.aquariums)
    let aqua = this.aquariums[aquariumid]
    let me = this;
    if (aqua) {
      let newmeasurementfiltered = {};
      for (let m in newmeasurement) {
        if (newmeasurement[m]) {
          newmeasurementfiltered[m] = newmeasurement[m]
        }
      }
      //aqua.measurements.unshift(newmeasurementfiltered);

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid});//,'x-appversion':'1.0'});	
      let options = new RequestOptions({ headers: headers });
      let params = newmeasurementfiltered;
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("aquariumid", aquariumid);	
      for(let keys in params){
        urlSearchParams.append(keys, params[keys]);
      }
      let body = urlSearchParams.toString();
      console.log("Body: " + body)
      let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/measurement/add', body, options);
      jsonresponse.map(res => res.json()).subscribe(data => {
        console.log('Measurement add returned following data: ', JSON.stringify(data));
        cb(true);
      }, err => {
        console.log("HTTP REQ failed with err: " + err);
        this.displayAlert(err, "addAquarium  failed")
        cb(false)
      });
    } else {
      console.log("aquariumid: " + aquariumid + " not found");
      cb(false);
    }
  }

  sortMeasurementsByKey(objs, key) {
    console.log("Ordering: " + JSON.stringify(objs));
    function compare(a,b) {
      if (a[key] < b[key])
        return -1;
      if (a[key] > b[key])
        return 1;
      return 0;
    }
    
    objs.sort(compare);
    console.log("Ordering result: " + JSON.stringify(objs));
    return objs;
  }

  /*getLocalData(data){
    return this.http.get('assets/data/FAQ.json').subscribe(data, function(e) {
      console.log("e");
      console.log(e);
    })*/
    /*return this.http.get('assets/data/FAQ.json') .map((res: Response) => {
      //this.allPowers = res.json();
      //this.pushDataChangeMessage(DataServiceAction.PowerDataLoaded, this.allPowers);
      console.log("got the powers from HTTP");
      console.log(res.json())
      //return res.json();
      return ["lala"];
    }); */
  //}

  /*getLocalData() {
    return this.http.get('assets/data/FAQ.json').subscribe(data => {
      console.log(data);
      this.results = data['results'];
    });
  }*/

}
