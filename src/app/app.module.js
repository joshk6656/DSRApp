import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { HelpdetailsPage } from '../pages/helpdetails/helpdetails';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DsrDataProvider } from '../providers/dsr-data/dsr-data';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
var firebaseconfig = {
    apiKey: "AIzaSyCpvbpx6StGtfQb1kLc7M9POfUBBknjEAo",
    authDomain: "dsrreefingapp.firebaseapp.com",
    databaseURL: "https://dsrreefingapp.firebaseio.com",
    projectId: "dsrreefingapp",
    storageBucket: "dsrreefingapp.appspot.com",
    messagingSenderId: "820818360210"
};
firebase.initializeApp(firebaseconfig);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
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
                        Addaquariumstep1Page
                    ],
                    imports: [
                        BrowserModule,
                        IonicModule.forRoot(MyApp),
                        IonicStorageModule.forRoot(),
                        HttpClientModule,
                        HttpModule,
                        AngularFireModule.initializeApp(firebaseconfig),
                        AngularFireDatabaseModule,
                        AngularFireAuthModule
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
                        Addaquariumstep1Page
                    ],
                    providers: [
                        StatusBar,
                        SplashScreen,
                        { provide: ErrorHandler, useClass: IonicErrorHandler },
                        DsrDataProvider,
                        AngularFireAuth,
                        AuthServiceProvider
                    ]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map