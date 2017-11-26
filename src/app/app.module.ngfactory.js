/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "./app.module";
import * as i2 from "ionic-angular/components/app/app-root";
import * as i3 from "../../node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory";
import * as i4 from "../../node_modules/ionic-angular/components/alert/alert-component.ngfactory";
import * as i5 from "../../node_modules/ionic-angular/components/app/app-root.ngfactory";
import * as i6 from "../../node_modules/ionic-angular/components/loading/loading-component.ngfactory";
import * as i7 from "../../node_modules/ionic-angular/components/modal/modal-component.ngfactory";
import * as i8 from "../../node_modules/ionic-angular/components/picker/picker-component.ngfactory";
import * as i9 from "../../node_modules/ionic-angular/components/popover/popover-component.ngfactory";
import * as i10 from "../../node_modules/ionic-angular/components/select/select-popover-component.ngfactory";
import * as i11 from "../../node_modules/ionic-angular/components/toast/toast-component.ngfactory";
import * as i12 from "./app.component.ngfactory";
import * as i13 from "../pages/about/about.ngfactory";
import * as i14 from "../pages/help/help.ngfactory";
import * as i15 from "../pages/dashboard/dashboard.ngfactory";
import * as i16 from "../pages/home/home.ngfactory";
import * as i17 from "../pages/tabs/tabs.ngfactory";
import * as i18 from "../pages/addmeasurement/addmeasurement.ngfactory";
import * as i19 from "../pages/selectmethod/selectmethod.ngfactory";
import * as i20 from "../pages/aquariumdetails/aquariumdetails.ngfactory";
import * as i21 from "../pages/helpdetails/helpdetails.ngfactory";
import * as i22 from "../pages/aquariumdosing/aquariumdosing.ngfactory";
import * as i23 from "../pages/addaquariumstep1/addaquariumstep1.ngfactory";
import * as i24 from "@angular/common";
import * as i25 from "@angular/platform-browser";
import * as i26 from "ionic-angular/gestures/gesture-config";
import * as i27 from "@angular/forms";
import * as i28 from "@angular/common/http";
import * as i29 from "@angular/http";
import * as i30 from "angularfire2";
import * as i31 from "angularfire2/database";
import * as i32 from "angularfire2/auth";
import * as i33 from "ionic-angular/components/action-sheet/action-sheet-controller";
import * as i34 from "ionic-angular/components/app/app";
import * as i35 from "ionic-angular/config/config";
import * as i36 from "ionic-angular/components/alert/alert-controller";
import * as i37 from "ionic-angular/util/events";
import * as i38 from "ionic-angular/util/form";
import * as i39 from "ionic-angular/tap-click/haptic";
import * as i40 from "ionic-angular/platform/platform";
import * as i41 from "ionic-angular/platform/keyboard";
import * as i42 from "ionic-angular/platform/dom-controller";
import * as i43 from "ionic-angular/components/loading/loading-controller";
import * as i44 from "ionic-angular/module";
import * as i45 from "ionic-angular/navigation/url-serializer";
import * as i46 from "ionic-angular/navigation/deep-linker";
import * as i47 from "ionic-angular/util/module-loader";
import * as i48 from "ionic-angular/components/modal/modal-controller";
import * as i49 from "ionic-angular/components/picker/picker-controller";
import * as i50 from "ionic-angular/components/popover/popover-controller";
import * as i51 from "ionic-angular/tap-click/tap-click";
import * as i52 from "ionic-angular/gestures/gesture-controller";
import * as i53 from "ionic-angular/components/toast/toast-controller";
import * as i54 from "ionic-angular/transitions/transition-controller";
import * as i55 from "@ionic/storage/dist/storage";
import * as i56 from "@ionic-native/status-bar/index";
import * as i57 from "@ionic-native/splash-screen/index";
import * as i58 from "../providers/auth-service/auth-service";
import * as i59 from "../providers/dsr-data/dsr-data";
import * as i60 from "ionic-angular/util/ionic-error-handler";
import * as i61 from "ionic-angular/platform/platform-registry";
import * as i62 from "ionic-angular/components/app/menu-controller";
import * as i63 from "ionic-angular/util/ng-module-loader";
import * as i64 from "ionic-angular/config/mode-registry";
import * as i65 from "@ionic/storage/dist/index";
import * as i66 from "./app.component";
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.IonicApp], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.ActionSheetCmpNgFactory, i4.AlertCmpNgFactory, i5.IonicAppNgFactory, i6.LoadingCmpNgFactory, i7.ModalCmpNgFactory, i8.PickerCmpNgFactory, i9.PopoverCmpNgFactory, i10.SelectPopoverNgFactory, i11.ToastCmpNgFactory, i12.MyAppNgFactory, i13.AboutPageNgFactory, i14.HelpPageNgFactory, i15.DashboardPageNgFactory, i16.HomePageNgFactory, i17.TabsPageNgFactory, i18.AddmeasurementPageNgFactory, i19.SelectmethodPageNgFactory, i20.AquariumdetailsPageNgFactory, i21.HelpdetailsPageNgFactory, i22.AquariumdosingPageNgFactory, i23.Addaquariumstep1PageNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵm, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i24.NgLocalization, i24.NgLocaleLocalization, [i0.LOCALE_ID, [2, i24.ɵa]]), i0.ɵmpd(5120, i0.APP_ID, i0.ɵf, []), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵk, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵl, []), i0.ɵmpd(4608, i25.DomSanitizer, i25.ɵe, [i24.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i25.DomSanitizer]), i0.ɵmpd(4608, i25.HAMMER_GESTURE_CONFIG, i26.IonicGestureConfig, []), i0.ɵmpd(5120, i25.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new i25.ɵDomEventsPlugin(p0_0, p0_1), new i25.ɵKeyEventsPlugin(p1_0), new i25.ɵHammerGesturesPlugin(p2_0, p2_1)]; }, [i24.DOCUMENT, i0.NgZone, i24.DOCUMENT, i24.DOCUMENT, i25.HAMMER_GESTURE_CONFIG]), i0.ɵmpd(4608, i25.EventManager, i25.EventManager, [i25.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i25.ɵDomSharedStylesHost, i25.ɵDomSharedStylesHost, [i24.DOCUMENT]), i0.ɵmpd(4608, i25.ɵDomRendererFactory2, i25.ɵDomRendererFactory2, [i25.EventManager, i25.ɵDomSharedStylesHost]), i0.ɵmpd(6144, i0.RendererFactory2, null, [i25.ɵDomRendererFactory2]), i0.ɵmpd(6144, i25.ɵSharedStylesHost, null, [i25.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]), i0.ɵmpd(4608, i25.Meta, i25.Meta, [i24.DOCUMENT]), i0.ɵmpd(4608, i25.Title, i25.Title, [i24.DOCUMENT]), i0.ɵmpd(4608, i27.ɵi, i27.ɵi, []), i0.ɵmpd(4608, i27.FormBuilder, i27.FormBuilder, []), i0.ɵmpd(4608, i28.HttpXsrfTokenExtractor, i28.ɵg, [i24.DOCUMENT, i0.PLATFORM_ID, i28.ɵe]), i0.ɵmpd(4608, i28.ɵh, i28.ɵh, [i28.HttpXsrfTokenExtractor, i28.ɵf]), i0.ɵmpd(5120, i28.HTTP_INTERCEPTORS, function (p0_0) { return [p0_0]; }, [i28.ɵh]), i0.ɵmpd(4608, i28.ɵd, i28.ɵd, []), i0.ɵmpd(6144, i28.XhrFactory, null, [i28.ɵd]), i0.ɵmpd(4608, i28.HttpXhrBackend, i28.HttpXhrBackend, [i28.XhrFactory]), i0.ɵmpd(6144, i28.HttpBackend, null, [i28.HttpXhrBackend]), i0.ɵmpd(5120, i28.HttpHandler, i28.ɵinterceptingHandler, [i28.HttpBackend, [2, i28.HTTP_INTERCEPTORS]]), i0.ɵmpd(4608, i28.HttpClient, i28.HttpClient, [i28.HttpHandler]), i0.ɵmpd(4608, i29.BrowserXhr, i29.BrowserXhr, []), i0.ɵmpd(4608, i29.ResponseOptions, i29.BaseResponseOptions, []), i0.ɵmpd(5120, i29.XSRFStrategy, i29.ɵa, []), i0.ɵmpd(4608, i29.XHRBackend, i29.XHRBackend, [i29.BrowserXhr, i29.ResponseOptions, i29.XSRFStrategy]), i0.ɵmpd(4608, i29.RequestOptions, i29.BaseRequestOptions, []), i0.ɵmpd(5120, i29.Http, i29.ɵb, [i29.XHRBackend, i29.RequestOptions]), i0.ɵmpd(5120, i30.FirebaseApp, i30.ɵa, [i30.FirebaseAppConfigToken, i30.FirebaseAppName]), i0.ɵmpd(5120, i31.AngularFireDatabase, i31._getAngularFireDatabase, [i30.FirebaseApp]), i0.ɵmpd(4608, i32.AngularFireAuth, i32.AngularFireAuth, [i30.FirebaseApp]), i0.ɵmpd(4608, i33.ActionSheetController, i33.ActionSheetController, [i34.App, i35.Config]), i0.ɵmpd(4608, i36.AlertController, i36.AlertController, [i34.App, i35.Config]), i0.ɵmpd(4608, i37.Events, i37.Events, []), i0.ɵmpd(4608, i38.Form, i38.Form, []), i0.ɵmpd(4608, i39.Haptic, i39.Haptic, [i40.Platform]), i0.ɵmpd(4608, i41.Keyboard, i41.Keyboard, [i35.Config, i40.Platform, i0.NgZone, i42.DomController]), i0.ɵmpd(4608, i43.LoadingController, i43.LoadingController, [i34.App, i35.Config]), i0.ɵmpd(5120, i24.LocationStrategy, i44.provideLocationStrategy, [i24.PlatformLocation, [2, i24.APP_BASE_HREF], i35.Config]), i0.ɵmpd(4608, i24.Location, i24.Location, [i24.LocationStrategy]), i0.ɵmpd(5120, i45.UrlSerializer, i45.setupUrlSerializer, [i34.App, i45.DeepLinkConfigToken]), i0.ɵmpd(5120, i46.DeepLinker, i46.setupDeepLinker, [i34.App, i45.UrlSerializer, i24.Location, i47.ModuleLoader, i0.ComponentFactoryResolver]), i0.ɵmpd(4608, i48.ModalController, i48.ModalController, [i34.App, i35.Config, i46.DeepLinker]), i0.ɵmpd(4608, i49.PickerController, i49.PickerController, [i34.App, i35.Config]), i0.ɵmpd(4608, i50.PopoverController, i50.PopoverController, [i34.App, i35.Config, i46.DeepLinker]), i0.ɵmpd(4608, i51.TapClick, i51.TapClick, [i35.Config, i40.Platform, i42.DomController, i34.App, i52.GestureController]), i0.ɵmpd(4608, i53.ToastController, i53.ToastController, [i34.App, i35.Config]), i0.ɵmpd(4608, i54.TransitionController, i54.TransitionController, [i40.Platform, i35.Config]), i0.ɵmpd(5120, i55.Storage, i55.provideStorage, [i55.StorageConfigToken]), i0.ɵmpd(4608, i56.StatusBar, i56.StatusBar, []), i0.ɵmpd(4608, i57.SplashScreen, i57.SplashScreen, []), i0.ɵmpd(4608, i58.AuthServiceProvider, i58.AuthServiceProvider, [i28.HttpClient, i32.AngularFireAuth]), i0.ɵmpd(4608, i59.DsrDataProvider, i59.DsrDataProvider, [i29.Http, i58.AuthServiceProvider]), i0.ɵmpd(512, i24.CommonModule, i24.CommonModule, []), i0.ɵmpd(512, i0.ErrorHandler, i60.IonicErrorHandler, []), i0.ɵmpd(256, i35.ConfigToken, null, []), i0.ɵmpd(1024, i61.PlatformConfigToken, i61.providePlatformConfigs, []), i0.ɵmpd(1024, i40.Platform, i40.setupPlatform, [i25.DOCUMENT, i61.PlatformConfigToken, i0.NgZone]), i0.ɵmpd(1024, i35.Config, i35.setupConfig, [i35.ConfigToken, i40.Platform]), i0.ɵmpd(512, i42.DomController, i42.DomController, [i40.Platform]), i0.ɵmpd(512, i62.MenuController, i62.MenuController, []), i0.ɵmpd(512, i34.App, i34.App, [i35.Config, i40.Platform, [2, i62.MenuController]]), i0.ɵmpd(512, i52.GestureController, i52.GestureController, [i34.App]), i0.ɵmpd(256, i45.DeepLinkConfigToken, null, []), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i63.NgModuleLoader, i63.NgModuleLoader, [i0.Compiler]), i0.ɵmpd(1024, i47.ModuleLoader, i47.provideModuleLoader, [i63.NgModuleLoader, i0.Injector]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0, p2_0, p2_1, p3_0, p3_1, p3_2, p3_3, p3_4, p4_0, p4_1, p4_2, p4_3) { return [i25.ɵh(p0_0), i64.registerModeConfigs(p1_0), i37.setupProvideEvents(p2_0, p2_1), i51.setupTapClick(p3_0, p3_1, p3_2, p3_3, p3_4), i47.setupPreloading(p4_0, p4_1, p4_2, p4_3)]; }, [[2, i0.NgProbeToken], i35.Config, i40.Platform, i42.DomController, i35.Config, i40.Platform, i42.DomController, i34.App, i52.GestureController, i35.Config, i45.DeepLinkConfigToken, i47.ModuleLoader, i0.NgZone]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(512, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(512, i25.BrowserModule, i25.BrowserModule, [[3, i25.BrowserModule]]), i0.ɵmpd(512, i27.ɵba, i27.ɵba, []), i0.ɵmpd(512, i27.FormsModule, i27.FormsModule, []), i0.ɵmpd(512, i27.ReactiveFormsModule, i27.ReactiveFormsModule, []), i0.ɵmpd(512, i44.IonicModule, i44.IonicModule, []), i0.ɵmpd(512, i65.IonicStorageModule, i65.IonicStorageModule, []), i0.ɵmpd(512, i28.HttpClientXsrfModule, i28.HttpClientXsrfModule, []), i0.ɵmpd(512, i28.HttpClientModule, i28.HttpClientModule, []), i0.ɵmpd(512, i29.HttpModule, i29.HttpModule, []), i0.ɵmpd(512, i30.AngularFireModule, i30.AngularFireModule, []), i0.ɵmpd(512, i31.AngularFireDatabaseModule, i31.AngularFireDatabaseModule, []), i0.ɵmpd(512, i32.AngularFireAuthModule, i32.AngularFireAuthModule, []), i0.ɵmpd(512, i1.AppModule, i1.AppModule, []), i0.ɵmpd(256, i28.ɵe, "XSRF-TOKEN", []), i0.ɵmpd(256, i28.ɵf, "X-XSRF-TOKEN", []), i0.ɵmpd(256, i30.FirebaseAppConfigToken, { apiKey: "AIzaSyCpvbpx6StGtfQb1kLc7M9POfUBBknjEAo", authDomain: "dsrreefingapp.firebaseapp.com", databaseURL: "https://dsrreefingapp.firebaseio.com", projectId: "dsrreefingapp", storageBucket: "dsrreefingapp.appspot.com", messagingSenderId: "820818360210" }, []), i0.ɵmpd(256, i30.FirebaseAppName, undefined, []), i0.ɵmpd(256, i2.AppRootToken, i66.MyApp, []), i0.ɵmpd(256, i24.APP_BASE_HREF, "/", []), i0.ɵmpd(256, i55.StorageConfigToken, null, [])]); });
export { AppModuleNgFactory as AppModuleNgFactory };
//# sourceMappingURL=app.module.ngfactory.js.map