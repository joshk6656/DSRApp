/*
/// <reference path="bugsnag.d.ts" />
*/
import Bugsnag from 'bugsnag-js'

/*import { ErrorHandler } from '@angular/core';*/
import { IonicErrorHandler } from 'ionic-angular';

Bugsnag.apiKey = 'ad7522ceb3d158ac7242a4e0ffe18854'

export class BugsnagErrorHandler implements IonicErrorHandler {
    handleError(error: any) {
      Bugsnag.notifyException(error, {
        angular: !error.ngDebugContext
          ? undefined
          : { component: error.ngDebugContext.component, context: error.ngDebugContext.context }
      })
      console.error("Bugsnag handleError:" + error);
    }
}

export { Bugsnag };