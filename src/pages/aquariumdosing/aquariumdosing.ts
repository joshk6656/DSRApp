import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';

/**
 * Generated class for the AquariumdosingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aquariumdosing',
  templateUrl: 'aquariumdosing.html',
})
export class AquariumdosingPage {
  public aquarium;// {"measurements": [], "targetvalues": [], "name": "", "dosings": {}, "totalwatervolume": 0, "DSRmethod": "UNKNOWN"};
  nomeasurements = false;
  parameters;
  dosings;
  correctionvalues = false;
  aquariumid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider) {
    this.aquariumid = navParams.get("aquariumid");
    console.log("Print aquarium:")
    console.log(this.dsrData.aquariums[this.aquariumid])
    this.aquarium = this.dsrData.aquariums[this.aquariumid]
    if (!this.dsrData.dosings.hasOwnProperty(this.aquarium.DSRmethod)) {
      console.log("DSR Method not supported")
      return;
    }
    this.aquarium.dosings = this.dsrData.dosings[this.aquarium.DSRmethod][this.aquarium.occupation]
    this.parameters = Object.keys(this.dsrData.dosings[this.aquarium.DSRmethod][this.aquarium.occupation])//this.aquarium.dosings);//this.dsrData.controlparameters["EZ"];
    if (this.aquarium.measurements.length < 1) {
      this.nomeasurements = true;
    } else {
      if (this.aquarium.measurements.length >= 1) {
        //let lastmeasurements = this.aquarium.measurements.slice(-2) // .reverse()
        //let lastmeasurements = this.dsrData.sortMeasurementsByKey(this.aquarium.measurements, "tom").slice(-2);
        //console.log(lastmeasurements)
        let lastmeasurement = this.aquarium.measurements[0]
        //let onebeforelastmeasurement = this.aquarium.measurements[1]
        console.log("lastmeasurement: " + JSON.stringify(lastmeasurement))// + " - onebeforelastmeasurement: " + JSON.stringify(onebeforelastmeasurement));
        for (let id in this.parameters) {
          let parameter = this.parameters[id];
          console.log("Check if lastmeasurement has parameter: " + parameter + " and if onebeforelastmeasurement has parameter: " + parameter);
          /*let parameter2 = parameter
          if (parameter == "mg" && lastmeasurement.hasOwnProperty("ca") && !lastmeasurement.hasOwnProperty("ca") ) {
            parameter = "ca"
          }*/
          console.log(lastmeasurement)
          if (lastmeasurement.hasOwnProperty(parameter)) {// && onebeforelastmeasurement.hasOwnProperty(parameter)) {
            this.aquarium.dosings[parameter]["status"] = lastmeasurement[parameter+"status"];
            let dosinggoal;
            let diff;
            let checkOnTarget = this.dsrData.checkOnTarget(parameter, lastmeasurement[parameter])
            console.log("checkOnTarget: " + checkOnTarget)
            if (checkOnTarget == 0) {//lastmeasurement[parameter] == onebeforelastmeasurement[parameter]) {
              console.log(parameter+" on target, keep dosing same value");
              this.aquarium.dosings[parameter]["correctionvalue"] = null;
              dosinggoal = "stable"
            } else if (checkOnTarget < 0) {
              console.log("Above target, need to lower parameter");
              dosinggoal = this.dsrData.dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "up": "down";
              diff = checkOnTarget * -1;
            } else {
              console.log("Below target, need to increase parameter");
              dosinggoal = this.dsrData.dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "down" : "up";
              diff = checkOnTarget
            }
            console.log("Dosing goal: " + dosinggoal)

            //} else if (Number.parseFloat(onebeforelastmeasurement[parameter]) < Number.parseFloat(lastmeasurement[parameter])) {
              console.log("lastmeasurement[parameter]: " + lastmeasurement[parameter])// + " - onebeforelastmeasurement[parameter]: " + onebeforelastmeasurement[parameter])
              //lastmeasurement[parameter] - onebeforelastmeasurement[parameter]
              //console.log(parameter+" going up, difference is: " + diff)
              //console.log(parameter+" status: "+lastmeasurement[parameter+"status"])
              /*if (lastmeasurement[parameter+"status"] == "high") {
                console.log("Need to lower "+parameter+" by "+diff);
                dosinggoal = this.dsrData.dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "up": "down";
              } else if (lastmeasurement[parameter+"status"] == "low") {
                console.log("Need increase "+parameter+" by "+ diff);
                dosinggoal = this.dsrData.dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "down" : "up";
              }*/
              let normaldosing = (this.aquarium.dosings[parameter]["dosing"] / 100) * this.aquarium.totalwatervolume;
              console.log("Need to " + (dosinggoal == "down" ? "decrease" : "increase") + " "+parameter+" by "+diff+" or higher");
              console.log("Normal dosing: " + normaldosing)
              let increaseddosing = 0;
              if (dosinggoal == "down") {



                //console.log("Normal dosing: " + normaldosing)
                if (this.dsrData.dosingcorrections[parameter].hasOwnProperty("correctiontype") && this.dsrData.dosingcorrections[parameter]["correctiontype"] == "%") {
                  let day = 1; 
                  if (this.aquarium.dosings[parameter].hasOwnProperty("day")) {
                    day = this.aquarium.dosings[parameter]["day"];
                  } else {
                    this.aquarium.dosings[parameter]["day"] = day;
                  }
                  increaseddosing = normaldosing
                  for (let i = 0; i < day; i++) {
                    let increasepercentage = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] / 100) + 1)
                    increaseddosing = increaseddosing / increasepercentage
                    console.log("increaseddosing : " + increaseddosing);
                  }
                  console.log("New value based on %: " + increaseddosing);
                  console.log("New Dosing: " + increaseddosing);
                  this.aquarium.dosings[parameter]["correctionvalue"] = increaseddosing;
                } else {
                  increaseddosing = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
                  console.log("Verminder dosering met: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff) + " of: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff) / 7 + " per dag")
                  console.log("Increase with: " + increaseddosing)
                  console.log("New Dosing: " + (normaldosing + increaseddosing));
                  this.aquarium.dosings[parameter]["correctionvalue"] = normaldosing - increaseddosing;
                  if ((normaldosing - increaseddosing) < 0) {
                    this.aquarium.dosings[parameter]["correctionvalue"] = 0.00;
                  }
                }


                //console.log("Dosing verminderen voor: " + ((this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume) / (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * 1)) + " dagen" );
                /*if ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff) / 7 < (this.aquarium.dosings[parameter]["dosing"] / 100 * this.aquarium.totalwatervolume)) {
                //if (((this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume) / (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * 1)) < 7) {
                  //let normaldosing = (this.aquarium.dosings[parameter]["dosing"] / 100) * this.aquarium.totalwatervolume;
                  let decreaseddosing = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
                  console.log("Normal dosing: " + normaldosing)
                  console.log("Decrease with: " + decreaseddosing)
                  console.log("New Dosing: " + (normaldosing - decreaseddosing));
                  this.aquarium.dosings[parameter]["correctionvalue"] = normaldosing - decreaseddosing;
                } else {
                  this.aquarium.dosings[parameter]["correctionvalue"] = 0.00;
                }*/
                
              } else if (dosinggoal == "up") {
                //console.log("Need increase "+parameter+" by "+diff+" or higher");
                //let normaldosing = (this.aquarium.dosings[parameter]["dosing"] / 100) * this.aquarium.totalwatervolume;
                //let increaseddosing = 0;
                if (this.dsrData.dosingcorrections[parameter].hasOwnProperty("correctiontype") && this.dsrData.dosingcorrections[parameter]["correctiontype"] == "%") {
                  let day = 1; 
                  if (this.aquarium.dosings[parameter].hasOwnProperty("day")) {
                    day = this.aquarium.dosings[parameter]["day"];
                  } else {
                    this.aquarium.dosings[parameter]["day"] = day;
                  }
                  increaseddosing = normaldosing
                  for (let i = 0; i < day; i++) {
                    let increasepercentage = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] / 100) + 1)
                    increaseddosing = increaseddosing * increasepercentage
                    console.log("increaseddosing : " + increaseddosing);
                  }
                  console.log("New value based on %: " + increaseddosing);
                  console.log("New Dosing: " + increaseddosing);
                  this.aquarium.dosings[parameter]["correctionvalue"] = increaseddosing;
                } else {
                  increaseddosing = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
                  console.log("Vermeerder dosering met: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff))
                  console.log("Increase with: " + increaseddosing)
                  console.log("New Dosing: " + (normaldosing + increaseddosing));
                  this.aquarium.dosings[parameter]["correctionvalue"] = normaldosing + increaseddosing;
                }
                //let increaseddosing = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
                /*console.log("Vermeerder dosering met: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff))
                console.log("Dosing vermeerderen voor: " + ((this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume) / (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * 1)) + " dagen" );
                this.aquarium.dosings[parameter]["correctionvalue"] = (this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume / 100) + ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
              }
            } else {*/
              //onebeforelastmeasurement[parameter] - lastmeasurement[parameter]
              /*if (diff < 0) {
                console.log(parameter+" going up again, difference is: " + diff)
              } else {
                console.log(parameter+" going down, difference is: " + diff)
              }*/
              /*console.log(parameter+" status: "+lastmeasurement[parameter+"status"])
              if (lastmeasurement[parameter+"status"] == "high") {
                console.log("Going down by itself, leave dosing");
                console.log("Dosing laten voor x dagen: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * 1))
                //console.log("Dosing verminderen voor: " + ((this.aquarium.dosings["kh"]["dosing"] * this.aquarium.totalwatervolume) / (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)) + " dagen" );
              } else if (lastmeasurement[parameter+"status"] == "low") {*/
                /*console.log("Need increase "+parameter+" by "+diff+" or higher");
                console.log("Vermeerder dosering met: " + (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff))
                let normaldosing = (this.aquarium.dosings[parameter]["dosing"] / 100) * this.aquarium.totalwatervolume;
                let increaseddosing = ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
                console.log("Normal dosing: " + normaldosing)
                console.log("Decrease with: " + increaseddosing)
                console.log("New Dosing: " + (normaldosing - increaseddosing));
                this.aquarium.dosings[parameter]["correctionvalue"] = normaldosing + increaseddosing;*/
                //console.log("Dosing vermeerderen voor: " + ((this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume) / (this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * 1)) + " dagen" );
                //this.aquarium.dosings[parameter]["correctionvalue"] = (this.aquarium.dosings[parameter]["dosing"] * this.aquarium.totalwatervolume / 100) + ((this.dsrData.dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)/7);
              //}
            }
            if (this.aquarium.dosings[parameter].hasOwnProperty("correctionvalue")) {
              this.correctionvalues = true;
            }
          }

          console.log("Parameter: " + parameter);
          console.log(lastmeasurement)
          
          if (parameter == "mg" && lastmeasurement.hasOwnProperty("ca") && !lastmeasurement.hasOwnProperty("mg") ) {
            console.log("MG triggered, setting this with CA value")
            if (this.aquarium.dosings["ca"].hasOwnProperty("correctionvalue") && this.aquarium.dosings["ca"]["correctionvalue"]) {
              console.log("Setting correctionvalue")
              this.aquarium.dosings["mg"]["correctionvalue"] = this.aquarium.dosings["ca"]["correctionvalue"] / 2;
              this.aquarium.dosings[parameter]["status"] = lastmeasurement["castatus"];
            }
            //parameter = "ca"

          }
        }
      }
      //  Start dosings depending on load or pick last dosing, this dosing is saved in aquarium...
      console.log(this.aquarium)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AquariumdosingPage');
  }

}
