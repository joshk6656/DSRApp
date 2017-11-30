import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DsrDataProvider } from '../../providers/dsr-data/dsr-data';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

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
  DSRmethod = "EZ";

  constructor(public navCtrl: NavController, public navParams: NavParams, private dsrData: DsrDataProvider, private log: LoggerServiceProvider) {
    this.aquariumid = navParams.get("aquariumid");
    this.aquarium = this.dsrData.aquariums[this.aquariumid]

    this.DSRmethod = this.aquarium.DSRmethod;
    this.calculateDosings(this.DSRmethod);
  }

  calculateDosings(DSRmethod) {
    if (!this.dsrData.dosings.hasOwnProperty(DSRmethod)) {
      this.log.info('AquariumdosingPage','calculateDosings','DSR Method not supported: ' + DSRmethod);
      return;
    }

    this.aquarium.dosings = (DSRmethod === "EZ" ? this.dsrData.dosings[DSRmethod][this.aquarium.occupation] : this.dsrData.dosings[DSRmethod])
    this.parameters = Object.keys(this.aquarium.dosings);

    if (this.aquarium.measurements.length < 1) {
      this.nomeasurements = true;
      this.log.info('AquariumdosingPage','calculateDosings','No measurements, use default dosing for: ' + DSRmethod);
      return;
    }

    if (this.aquarium.measurements.length >= 1) {
      let lastmeasurement = this.aquarium.measurements[0]
      console.log(lastmeasurement)
      this.log.debug('AquariumdosingPage','calculateDosings','lastmeasurement: ' + JSON.stringify(lastmeasurement));
      let dosingcorrections = this.dsrData.dosingcorrections[this.DSRmethod]

      for (let id in this.parameters) {
        let parameter = this.parameters[id];
        //console.log("Check if lastmeasurement has parameter: " + parameter + " and if onebeforelastmeasurement has parameter: " + parameter);
        console.log(parameter.toUpperCase()+":");
        //console.log(lastmeasurement)
        if (!dosingcorrections.hasOwnProperty(parameter)) {
          this.log.warning('AquariumdosingPage','calculateDosings','dosingcorrections missing parameter:' + parameter + " for DSRmethod: " + this.DSRmethod);
          continue;
        }
        if (lastmeasurement.hasOwnProperty(parameter)) {
          this.aquarium.dosings[parameter]["status"] = lastmeasurement[parameter+"status"];
          let dosinggoal;
          let diff;
          let checkOnTarget = this.dsrData.checkOnTarget(parameter, lastmeasurement[parameter])
          //console.log("checkOnTarget: " + checkOnTarget)
          if (checkOnTarget == 0) {//lastmeasurement[parameter] == onebeforelastmeasurement[parameter]) {
            dosinggoal = "stable"
            console.log(parameter+" on target, keep dosing same value. Dosing goal: " + dosinggoal);
            this.aquarium.dosings[parameter]["correctionvalue"] = null;
          } else if (checkOnTarget < 0) {
            dosinggoal = dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "up": "down";
            diff = checkOnTarget * -1;
            console.log("ABOVE target, need to lower parameter with: " + diff + " - Dosing goal: " + dosinggoal);
          } else {
            dosinggoal = dosingcorrections[parameter].hasOwnProperty("reverseddosing") ? "down" : "up";
            diff = checkOnTarget
            console.log("BELOW target, need to increase parameter with: " + diff + " - Dosing goal: " + dosinggoal);
          }
          let normaldosing = (this.aquarium.dosings[parameter]["dosing"] / 100) * this.aquarium.totalwatervolume;
          let increaseddosing = 0;
          let decreaseddosing = 0;
          if (dosinggoal == "down") {
            // Check if dosing correction type is %, in that case, it should be increased/decreased daily.
            if (dosingcorrections[parameter].hasOwnProperty("correctiontype") && dosingcorrections[parameter]["correctiontype"] == "%") {
              this.aquarium.dosings[parameter]["correctiontype"] = "%";
              let day = this.daysBetweenNowAndMeasurement(lastmeasurement["readabletom"])
              if (day > 7) day = 7; // Limit decrease to max 7 days per measurement
              let totaldecreasedosing = normaldosing;
              if (this.aquarium.dosings[parameter].hasOwnProperty("day")) {
                day = this.aquarium.dosings[parameter]["day"];
              } else {
                this.aquarium.dosings[parameter]["day"] = day;
              }
              for (let i = 0; i < day; i++) {
                let decreasepercentage = ((dosingcorrections[parameter]["correctionfactor"] / 100) + 1)
                decreaseddosing = decreaseddosing + ((totaldecreasedosing + decreaseddosing) * decreasepercentage)
                console.log("decreaseddosing : " + decreaseddosing);
              }
              totaldecreasedosing = totaldecreasedosing - decreaseddosing
              console.log("% DOSING: Need to decrease dosing with daily("+dosingcorrections[parameter]["correctionfactor"]+"%), on day "+day+" reaching: " + decreaseddosing + " resulting in a total dose of: " + totaldecreasedosing);
              this.aquarium.dosings[parameter]["correctionvalue"] = decreaseddosing;
            } else {
              let todecreasedosing = (dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)
              decreaseddosing = (todecreasedosing/7);
              let totaldecreasedosing = normaldosing - decreaseddosing
              console.log("NORMAL DOSING: Total decrease dosing with: " + todecreasedosing + " - devided by 7 days: " + decreaseddosing + " increased with normal dosis of " + normaldosing + " = " + totaldecreasedosing);
              this.aquarium.dosings[parameter]["correctionvalue"] = totaldecreasedosing;
              if (totaldecreasedosing < 0) {
                this.aquarium.dosings[parameter]["correctionvalue"] = 0.00;
              }
            }
          } else if (dosinggoal == "up") {
            // Check if dosing correction type is %, in that case, it should be increased/decreased daily.
            if (dosingcorrections[parameter].hasOwnProperty("correctiontype") && dosingcorrections[parameter]["correctiontype"] == "%") {
              this.aquarium.dosings[parameter]["correctiontype"] = "%";
              let day = this.daysBetweenNowAndMeasurement(lastmeasurement["readabletom"])
              if (day > 7) day = 7; // Limit increase to max 7 days per measurement
              let totalincreasedosing = normaldosing;
              if (this.aquarium.dosings[parameter].hasOwnProperty("day")) {
                day = this.aquarium.dosings[parameter]["day"];
              } else {
                this.aquarium.dosings[parameter]["day"] = day;
              }
              for (let i = 0; i < day; i++) {
                let increasepercentage = ((dosingcorrections[parameter]["correctionfactor"] / 100))
                increaseddosing = increaseddosing + ((totalincreasedosing+increaseddosing) * increasepercentage)
              }
              totalincreasedosing = totalincreasedosing + increaseddosing
              console.log("% DOSING: Need to increase dosing with daily("+dosingcorrections[parameter]["correctionfactor"]+"%), on day "+day+" reaching: " + increaseddosing + " resulting in a total dose of: " + totalincreasedosing);
              this.aquarium.dosings[parameter]["correctionvalue"] = totalincreasedosing;
            } else {
              let toincreaseddosing = (dosingcorrections[parameter]["correctionfactor"] * this.aquarium.totalwatervolume * diff)
              increaseddosing = (toincreaseddosing/7);
              let totalincreaseddosing = normaldosing + increaseddosing;
              console.log("NORMAL DOSING: Total increase dosing with: " + toincreaseddosing + " - devided by 7 days: " + increaseddosing + " increased with normal dosis of " + normaldosing + " = " + totalincreaseddosing);
              this.aquarium.dosings[parameter]["correctionvalue"] = totalincreaseddosing;
            }
          }
          if (this.aquarium.dosings[parameter].hasOwnProperty("correctionvalue")) {
            this.correctionvalues = true;
          }
        } else {
          console.log("No measurement found for parameter:" + parameter)
          this.aquarium.dosings[parameter].missingmeasurement = true;
        }
          
        if (this.DSRmethod === "EZ" && parameter == "mg" && lastmeasurement.hasOwnProperty("ca") && !lastmeasurement.hasOwnProperty("mg") ) {
          console.log("MG triggered, setting this with CA value")
          if (this.aquarium.dosings["ca"].hasOwnProperty("correctionvalue") && this.aquarium.dosings["ca"]["correctionvalue"]) {
            console.log("Setting correctionvalue")
            this.aquarium.dosings["mg"]["correctionvalue"] = this.aquarium.dosings["ca"]["correctionvalue"] / 2;
            this.aquarium.dosings[parameter]["status"] = lastmeasurement["castatus"];
          }
        }
      }
      //  Start dosings depending on load or pick last dosing, this dosing is saved in aquarium...
      console.log(this.aquarium)
    }
  }

  daysBetweenNowAndMeasurement(readabletom) {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let now = new Date();
    let lastMeasurement = new Date(readabletom);
    let utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    let utc2 = Date.UTC(lastMeasurement.getFullYear(), lastMeasurement.getMonth(), lastMeasurement.getDate());
    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AquariumdosingPage');
  }

}
