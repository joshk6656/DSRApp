import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

/*
  Generated class for the DsrDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DsrDataProvider {
  public faqitems;
  public faqsearcheditems;

  public aquariums = {}
  public aquariumkeys = []
  public triggerLoadAquariums = true;

  public measurementgoals = {
    ph: 8.1,
    salinity: 33,
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
    volumecorrection_active: false,
    volumecorrection: 0.00,
    totalwatervolume: 0.00//,
    //targetvalues: this.measurementgoals,
    //measurements: [],
    //dosings: {}
  }

  dosingcorrections = {
    "EZ": {
      "salinity": {
        "correctionfactor": 100/100,
        "correctiontype": "g",
        "maxcorrectionperday": 2
      },
      "kh": {
        "correctionfactor": 0.167,
        "correctiontype": "ml",
        "maxcorrectionperday": 1
      },
      "ca": {
        "correctionfactor": 0.00578,
        "correctiontype": "ml",
        "maxcorrectionperday": 20
      },
      "no3": {
        "correctionfactor": 7,
        "correctiontype": "%",
        "reverseddosing": true
      },
      "mg": {
        "correctionfactor": 0.00289,
        "correctiontype": "ml",
        "maxcorrectionperday": 50
      }
    },
    "FULLDSR": {
      "salinity": {
        "correctionfactor": 100/100,
        "correctiontype": "g",
        "maxcorrectionperday": 2
      },
      "kh": {
        "correctionfactor": 3/100,
        "correctiontype": "g",
        "maxcorrectionperday": 1
      },
      "ca": {
        "correctionfactor": 0.3668/100,
        "correctiontype": "g",
        "maxcorrectionperday": 20
      },
      "no3": {
        "correctionfactor": 7/100,
        "correctiontype": "%",
        "reverseddosing": true,
        "maxcorrectionperday": 2
      },
      /*"po4": {
        "correctionfactor": 7,
        "correctiontype": "%",
        "reverseddosing": true
      },*/
      "po4": {
        "correctionfactor": 10/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 0.04
      },
      "mg": {
        "correctionfactor": 0.836/100,
        "correctiontype": "g",
        "maxcorrectionperday": 50
      },
      "kalium": {
        "correctionfactor": 0.667/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 20
      },
      "strontium": {
        "correctionfactor": 3.04/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 3
      },
      "boor": {
        "correctionfactor": 12.68/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 2
      },
      "jodide": {
        "correctionfactor": 26/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 0.03
      },
      "mangaan": {
        "correctionfactor": 1/100,
        "correctiontype": "ml",
        "maxcorrectionperday": 0.1
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
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"},
        "kh": {"productname": "EZ-Buffer", "dosing": 0.00, "unit": "ml" },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.00, "unit": "ml" },
        "no3": {"productname": "EZ-Carbon", "dosing": 1.00, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.00, "unit": "ml" }
      },
      "LOW": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"},
        "kh": {"productname": "EZ-Buffer", "dosing": 2.00, "unit": "ml" },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.4, "unit": "ml"  },
        "no3": {"productname": "EZ-Carbon", "dosing": 1.50, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.2, "unit": "ml" }
      },
      "MID": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"},
        "kh": {"productname": "EZ-Buffer", "dosing": 4.00, "unit": "ml"  },
        "ca": {"productname": "EZ-Calcium", "dosing": 0.8, "unit": "ml" },
        "no3": {"productname": "EZ-Carbon", "dosing": 2.00, "unit": "ml" },
        "mg": {"productname": "EZ-Trace", "dosing": 0.4, "unit": "ml" }
      },
      "HIGH": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"},
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

  /*corrections = {
    "EZ": {
      "EMPTY": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"}
      },
      "LOW": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"}
      },
      "MID": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"}
      },
      "HIGH": {
        "salinity": {"productname": "NaCl+ Salt", "dosing": 0.00, "unit": "g"}
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
  }*/

  results: string[];
  
  constructor(public http: Http, public authService: AuthServiceProvider, public alertController : AlertController, private log: LoggerServiceProvider) {
    //console.log('Hello DsrDataProvider Provider');
  }

  loadAquariums(cb) {
    let me = this;

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});	
    let options = new RequestOptions({ headers: headers });
    let jsonresponse = me.http.get('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/list', options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      if (data.hasOwnProperty("returncode") && data.returncode == 200) {
        console.log('Data returned list of aquariums: ', JSON.stringify(data.message.list));
        if (data.message.list !== null) {
          me.aquariums = data.message.list
          me.aquariumkeys = Object.keys(me.aquariums)
        } else {
          me.aquariums = []
        }
        me.triggerLoadAquariums = false;
        cb(null, true);
      } else {
        console.log("Error while loading aquariums, error:" + (data.hasOwnProperty("error") ? data.error : "UNDEFINED"));
        cb(data.hasOwnProperty("error") ? data.error : "UNDEFINED", false);
      }
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      me.log.showAlert("loadAquariums  failed", err);
      cb(err, false)
    });
  }

  loadMeasurements(aquariumid, cb) {
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});	
    let options = new RequestOptions({ headers: headers });
    let jsonresponse = me.http.get('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/measurements?key=' + encodeURIComponent(aquariumid), options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log("Response:" + JSON.stringify(data))
      console.log('Data returned list of measurements: ', JSON.stringify(data.message.measurements));
      /*let measurements = []
      for (let item in Object.keys(data.message.measurements)) {
        data.message.measurements[item]["key"] = item
        measurements.push(data.message.measurements[item])
      }*/
      me.aquariums[aquariumid].measurements = data.message.measurements //measurements.reverse()
      cb(true);
    })
  }

  getMeasurements(aquariumid, reverse=true) {
    let measurements = []
    for (let item in this.aquariums[aquariumid]["measurements"]) {
      //me.dsrData.aquariums[me.aquariumid]["measurements"][item]["key"] = item
      let tom = item;
      let arr = this.aquariums[aquariumid]["measurements"][item];
      if (!arr.hasOwnProperty("key")) {
        arr["key"] = tom;
      }
      measurements.push(arr)
    }
    return this.sortMeasurementsByKey(measurements, "key", reverse) 
    //return measurements;
  }
  getEvents(aquariumid, reverse=true) {
    let events = []
    if (!this.aquariums[aquariumid].hasOwnProperty("events")) return events;
    for (let item in this.aquariums[aquariumid]["events"]) {
      //me.dsrData.aquariums[me.aquariumid]["measurements"][item]["key"] = item
      let toe = item;
      let arr = this.aquariums[aquariumid]["events"][item];
      if (!arr.hasOwnProperty("key")) {
        arr["key"] = toe;
      }
      events.push(arr)
    }
    return this.sortMeasurementsByKey(events, "key", reverse) 
    //return measurements;
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
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
    let options = new RequestOptions({ headers: headers });
    let params = aqua;
    let me = this;
    let urlSearchParams = new URLSearchParams();		
    for(let key in params){
      urlSearchParams.append(key, params[key]);
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = this.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/add', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium add returned following data: ', JSON.stringify(data));
      let aquaid = data.message.aquariumid
      this.aquariums[aquaid] = aqua;
      this.aquariumkeys = Object.keys(this.aquariums)
      if (data.hasOwnProperty("returncode") && data.returncode === 200) {
        cb(aquaid);
      } else {
        console.log("REQ failed with err: " + data.hasOwnProperty("error") ? data.error : "Unknown error");
        me.log.showAlert(data.hasOwnProperty("error") ? data.error : "Unknown error", "Try again later");
        cb(false);
      }
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      me.log.showAlert("Add aquarium failed", err);
      cb(false)
    });
  }

  updateAquarium(aquariumid, aqua, cb) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
    let options = new RequestOptions({ headers: headers });
    let params = aqua;
    let me = this;
    let urlSearchParams = new URLSearchParams();
    //urlSearchParams.append("aquariumid", aquariumid);
    for(let key in params){
      if (["measurements"].indexOf(key) == -1) {
        urlSearchParams.append(key, params[key]);
      }
    }
    let body = urlSearchParams.toString();
    console.log("Body: " + body)
    let jsonresponse = this.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/aquarium/update', body, options);
    jsonresponse.map(res => res.json()).subscribe(data => {
      console.log('Aquarium update returned following data: ', JSON.stringify(data));
      //console.log(data.message.aquariumid)
      let aquaid = data.message.aquariumid
      this.aquariums[aquaid] = aqua;
      this.aquariumkeys = Object.keys(this.aquariums)
      cb(aquaid)
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      me.log.showAlert("update Aquarium failed", err);
      cb(false)
    });
  }

  setDSRMethod(aquariumid, method, cb){
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
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
      me.log.showAlert("setDSRMethod failed", err);
      cb(false)
    });
  }

  deleteAquarium(aquariumid, cb) {
    let me = this;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
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
      if (data.hasOwnProperty("returncode") && data.returncode === 200) {
        cb(true);
        delete me.aquariums[aquariumid]
        this.aquariumkeys = Object.keys(this.aquariums)
      } else {
        console.log("REQ failed with err: " + data.hasOwnProperty("error") ? data.error : "Unknown error");
        me.log.showAlert(data.hasOwnProperty("error") ? data.error : "Unknown error", "Try again later");
        cb(false);
      }
      //let occupation = me.aquariums[aquariumid].occupation
      //console.log(me.aquariums)
      //cb(true)
    }, err => {
      console.log("HTTP REQ failed with err: " + err);
      me.log.showAlert("delete Aquarium failed", err);
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

  addMeasurement(aquariumid, newmeasurement, tom, cb) {
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

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
      let options = new RequestOptions({ headers: headers });
      let params = newmeasurementfiltered;
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("aquariumid", aquariumid);	
      //urlSearchParams.append("tom", tom);	
      for(let keys in params){
        urlSearchParams.append(keys, params[keys]);
      }
      let body = urlSearchParams.toString();
      console.log("Body: " + body)
      let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/measurement/add', body, options);
      jsonresponse.map(res => res.json()).subscribe(data => {
        console.log('Measurement add returned following data: ', JSON.stringify(data));
        if (data.hasOwnProperty("returncode") && data.returncode === 200) {
          cb(true);
        } else {
          console.log("REQ failed with err: " + data.hasOwnProperty("error") ? data.error : "Unknown error");
          me.log.showAlert(data.hasOwnProperty("error") ? data.error : "Unknown error", "Parameter has incorrect format");
          cb(false);
        }
      }, err => {
        console.log("HTTP REQ failed with err: " + err);
        me.log.showAlert("add Measurement failed", err);
        cb(false);
      });
    } else {
      console.log("aquariumid: " + aquariumid + " not found");
      cb(false);
    }
  }

  addEvent(aquariumid, event, cb) {
    console.log("addEvent triggered for: " + aquariumid)
    console.log(this.aquariums)
    let aqua = this.aquariums[aquariumid]
    let me = this;
    /*let toe = event.toe;
    delete event.toe;*/
    if (aqua) {
      /*let newmeasurementfiltered = {};
      for (let m in newmeasurement) {
        if (newmeasurement[m]) {
          newmeasurementfiltered[m] = newmeasurement[m]
        }
      }*/
      //aqua.measurements.unshift(newmeasurementfiltered);

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + this.authService.user_uid, "x-appversion": this.log.version});
      let options = new RequestOptions({ headers: headers });
      let params = event;
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append("aquariumid", aquariumid);	
      //urlSearchParams.append("tom", tom);	
      for(let keys in params){
        urlSearchParams.append(keys, params[keys]);
      }
      let body = urlSearchParams.toString();
      console.log("Body: " + body)
      let jsonresponse = me.http.post('https://us-central1-dsrreefingapp.cloudfunctions.net/v1/event/add', body, options);
      jsonresponse.map(res => res.json()).subscribe(data => {
        console.log('Measurement add returned following data: ', JSON.stringify(data));
        if (data.hasOwnProperty("returncode") && data.returncode === 200) {
          cb(true);
        } else {
          console.log("REQ failed with err: " + data.hasOwnProperty("error") ? data.error : "Unknown error");
          me.log.showAlert(data.hasOwnProperty("error") ? data.error : "Unknown error", "Parameter has incorrect format");
          cb(false);
        }
      }, err => {
        console.log("HTTP REQ failed with err: " + err);
        me.log.showAlert("add Event failed", err);
        cb(false);
      });
    } else {
      console.log("aquariumid: " + aquariumid + " not found");
      cb(false);
    }
  }

  sortMeasurementsByKey(arr, key, reverse) {
    console.log(reverse);
    if (!arr.hasOwnProperty(key)) {
      console.log("Key: "+key+" not found in sortMeasurementsByKey");
      console.log(arr);
    }
    console.log("Ordering: " + JSON.stringify(arr));
    function compare(a,b) {
      if ((!reverse && a[key] < b[key]) || (reverse && a[key] > b[key]))
        return -1;
      if ((!reverse && a[key] > b[key]) || (reverse && a[key] < b[key]))
        return 1;
      return 0;
    }
    
    arr.sort(compare);
    console.log("Ordering result: " + JSON.stringify(arr));
    return arr;
  }

  loadFAQItems(cb) {
    let me = this;
    this.http.get('assets/data/FAQ.json').map(res => res.json()).subscribe(function (data) {
      me.faqsearcheditems = data
      me.faqitems = data
      cb(true);
    }, function(e){
      console.log("e");
      console.log(e);
      cb(false);
    })
  }

  getFAQanswer(question, cb) {
    let me = this;
    if (typeof this.faqitems === "undefined") {
      this.loadFAQItems(function (result) {
        if (result) {
          me.log.info('DsrDataProvider','getFAQanswer','loadFAQItems faqitems loaded: ' + JSON.stringify(me.faqitems) + " for question: " + question);
          for (let i in me.faqitems) {
            if (me.faqitems[i].q == question) {
              cb(me.faqitems[i].a);
              return;
            }
          }
        } else {
          me.log.warning('DsrDataProvider','getFAQanswer','loadFAQItems failed: ' + result);
        }
        cb(false);
      });
    } else {
      for (let i in this.faqitems) {
        if (this.faqitems[i].q == question) {
          cb(this.faqitems[i].a);
          return;
        }
      }
      cb(false);
    }
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
