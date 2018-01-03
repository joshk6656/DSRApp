/*
/// <reference path="bugsnag.d.ts" />
*/
import Bugsnag from 'bugsnag-js';
//import createPlugin from 'bugsnag-angular';

/*import { ErrorHandler } from '@angular/core';*/
import { IonicErrorHandler } from 'ionic-angular';

//Bugsnag.apiKey = 'ad7522ceb3d158ac7242a4e0ffe18854'

const bugsnagClient = Bugsnag('ad7522ceb3d158ac7242a4e0ffe18854');
//const BugsnagErrorHandler = bugsnagClient.use(createPlugin());

export class BugsnagErrorHandler implements IonicErrorHandler {
    handleError(error: any) {
      bugsnagClient.notify(error, {
        beforeSend: function (report) {
          // overwrite UUID
          report.context = 'BugsnagErrorHandler';
        }/*,
        angular: !error.ngDebugContext
          ? undefined
          : { component: error.ngDebugContext.component, context: error.ngDebugContext.context }*/
      })
      console.error("Bugsnag handleError:" + error);
    }
}

export { bugsnagClient };