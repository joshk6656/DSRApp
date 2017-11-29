/// <reference path="bugsnag.d.ts" />

/*import { ErrorHandler } from '@angular/core';*/
import { IonicErrorHandler } from 'ionic-angular';

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