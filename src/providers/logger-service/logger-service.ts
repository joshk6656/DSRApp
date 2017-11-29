import { Injectable } from '@angular/core';
import { Bugsnag } from '../../error-handler';

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
  	
  constructor() {
    console.log('Hello LoggerServiceProvider Provider');
		this.lastEvents=[];
    this.maxEvents=30;
    //console.log(Bugsnag)
		Bugsnag.releaseStage = "development";
    this.activateConsoleLog = true;
    this.setAppVersion("0.0.10");
  }

	setAppVersion(version) {
		Bugsnag.appVersion = version;
  }

  setUser(obj) {
    Bugsnag.user = obj;
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

	applyLastEvent(pageName,msg,functionName,type){
		if (this.activateConsoleLog) console.log(type.toUpperCase()+' '+ pageName +' - '+'Msg:'+msg +','+ 'Function:' +functionName);
		if (this.lastEvents.length > this.maxEvents) this.lastEvents.pop();
		//this.lastEvents.unshift({pagename :pageName,msg:msg, funcName:functionName,log_type:type});
		this.lastEvents.unshift(type.toUpperCase()+' : ' + pageName + '/' + functionName + ': ' + msg);
		if (type !== "info" && type !== "debug") Bugsnag.notify(type.toUpperCase()+' DETECTED on '+pageName, msg , { 'LoggerService': this.lastEvents }, type);
				
	}
}
