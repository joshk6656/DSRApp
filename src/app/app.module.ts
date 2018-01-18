import { NgModule, ErrorHandler } from '@angular/core';
import { BugsnagErrorHandler } from '../error-handler'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';/*, IonicErrorHandler*/
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { Addaquariumstep1Page } from '../pages/addaquariumstep1/addaquariumstep1';
import { AddmeasurementPage } from '../pages/addmeasurement/addmeasurement';
import { SelectmethodPage } from '../pages/selectmethod/selectmethod';
import { AquariumdetailsPage } from '../pages/aquariumdetails/aquariumdetails';
import { AquariumdosingPage } from '../pages/aquariumdosing/aquariumdosing';
import { AddEventPage } from '../pages/addevent/addevent';

import { HelpdetailsPage } from '../pages/helpdetails/helpdetails';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DsrDataProvider } from '../providers/dsr-data/dsr-data';
//import { HttpClientModule } from '@angular/common/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { HttpModule } from '@angular/http';

import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoggerServiceProvider } from '../providers/logger-service/logger-service';

//import { TranslateModule } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Globalization } from '@ionic-native/globalization';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

let firebaseconfig = {
  apiKey: "AIzaSyCpvbpx6StGtfQb1kLc7M9POfUBBknjEAo",
  authDomain: "dsrreefingapp.firebaseapp.com",
  databaseURL: "https://dsrreefingapp.firebaseio.com",
  projectId: "dsrreefingapp",
  storageBucket: "dsrreefingapp.appspot.com",
  messagingSenderId: "820818360210"
}
firebase.initializeApp(firebaseconfig);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HelpPage,
    HomePage,
    DashboardPage,
    TabsPage,
    AddmeasurementPage,
    SelectmethodPage,
    AquariumdetailsPage,
    HelpdetailsPage,
    AquariumdosingPage,
    Addaquariumstep1Page,
    AddEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HelpPage,
    DashboardPage,
    HomePage,
    TabsPage,
    AddmeasurementPage,
    SelectmethodPage,
    AquariumdetailsPage,
    HelpdetailsPage,
    AquariumdosingPage,
    Addaquariumstep1Page,
    AddEventPage
  ],
  providers: [
    StatusBar,
    LoggerServiceProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: BugsnagErrorHandler},//BugsnagErrorHandler},IonicErrorHandler
    DsrDataProvider,
    AngularFireAuth,
    AuthServiceProvider,
    Facebook,
    GooglePlus,
    LoggerServiceProvider,
    Globalization
  ]
})
export class AppModule {}