import { Injectable } from '@angular/core';
import { bugsnagClient } from '../../error-handler';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the LoggerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggerServiceProvider {
	private lastEvents:any;
  private maxEvents:any;
  private activateConsoleLog: boolean;
  public version = "0.0.19";
  	
  constructor(public alertCtrl: AlertController) {
		this.lastEvents=[];
    this.maxEvents=30;
		bugsnagClient.config.releaseStage = "development";
    this.activateConsoleLog = true;
		this.setAppVersion(this.version);
  }

	setAppVersion(version) {
		bugsnagClient.config.appVersion = version;
  }

  setUser(obj) {
    bugsnagClient.user = obj;
	}

	setAquarium(obj) {
		bugsnagClient.metaData = {
			"aquarium": obj
		}
	}
	
	warning(pageName,msg,functionName){
		this.applyLastEvent(pageName,msg,functionName,'warning');
	}
	error(pageName,msg,functionName){
		this.applyLastEvent(pageName,msg,functionName,'error');
	}
	info(pageName,msg,functionName){
		this.applyLastEvent(pageName,msg,functionName,'info');
	}
	debug(pageName,msg,functionName){
		this.applyLastEvent(pageName,msg,functionName,'debug');
	}

	applyLastEvent(pageName,functionName, msg,type){
		if (this.activateConsoleLog) console.log(type.toUpperCase()+' '+ pageName +' - '+'Msg:'+msg +','+ 'Function:' +functionName);
		if (this.lastEvents.length > this.maxEvents) this.lastEvents.pop();
		//this.lastEvents.unshift({pagename :pageName,msg:msg, funcName:functionName,log_type:type});
		this.lastEvents.unshift(type.toUpperCase()+' : ' + pageName + '/' + functionName + ': ' + msg);
		if (type !== "info" && type !== "debug") {
			bugsnagClient.metaData["LoggerService"] = this.lastEvents;
			bugsnagClient.context = type.toUpperCase()+' DETECTED on '+pageName + ' ('+functionName+')';
			bugsnagClient.config.appVersion = this.version;
			bugsnagClient.notify(new Error(msg), {"severity": type});
		}		
	}

  showAlert(title, subTitle, buttonsArray = ["OK"]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttonsArray
    });
    alert.present();
  }
}
