/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "../../../node_modules/ionic-angular/components/button/button.ngfactory";
import * as i2 from "ionic-angular/components/button/button";
import * as i3 from "ionic-angular/config/config";
import * as i4 from "../../../node_modules/ionic-angular/components/content/content.ngfactory";
import * as i5 from "ionic-angular/components/content/content";
import * as i6 from "ionic-angular/platform/platform";
import * as i7 from "ionic-angular/platform/dom-controller";
import * as i8 from "ionic-angular/components/app/app";
import * as i9 from "ionic-angular/platform/keyboard";
import * as i10 from "ionic-angular/navigation/view-controller";
import * as i11 from "ionic-angular/navigation/nav-controller";
import * as i12 from "ionic-angular/components/grid/grid";
import * as i13 from "ionic-angular/components/grid/row";
import * as i14 from "@angular/common";
import * as i15 from "./home";
import * as i16 from "../../providers/auth-service/auth-service";
var styles_HomePage = [];
var RenderType_HomePage = i0.ɵcrt({ encapsulation: 2, styles: styles_HomePage, data: {} });
export { RenderType_HomePage as RenderType_HomePage };
function View_HomePage_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "section", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["\n          Welcome ", "\n          "])), (_l()(), i0.ɵeld(2, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.logout() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i1.View_Button_0, i1.RenderType_Button)), i0.ɵdid(3, 1097728, null, 0, i2.Button, [[8, ""], i3.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Logout"])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.user.displayName; _ck(_v, 1, 0, currVal_0); }); }
function View_HomePage_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "button", [["class", "loginBtn loginBtn--facebook"], ["full", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.fbLogin() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i1.View_Button_0, i1.RenderType_Button)), i0.ɵdid(1, 1097728, null, 0, i2.Button, [[8, ""], i3.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Login with Facebook"]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 1, 0, currVal_0); }, null); }
export function View_HomePage_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n\n"])), (_l()(), i0.ɵeld(1, 0, null, null, 29, "ion-content", [["class", "home"], ["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i4.View_Content_0, i4.RenderType_Content)), i0.ɵdid(2, 4374528, null, 0, i5.Content, [i3.Config, i6.Platform, i7.DomController, i0.ElementRef, i0.Renderer, i8.App, i9.Keyboard, i0.NgZone, [2, i10.ViewController], [2, i11.NavController]], null, null), (_l()(), i0.ɵted(-1, 1, ["\n\n  "])), (_l()(), i0.ɵeld(4, 0, null, 1, 25, "ion-grid", [["class", "grid"], ["style", "height: 100%"]], null, null, null, null, null)), i0.ɵdid(5, 16384, null, 0, i12.Grid, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(7, 0, null, null, 2, "ion-row", [["align-items-center", ""], ["class", "row"], ["justify-content-center", ""], ["style", "height: 10%"]], null, null, null, null, null)), i0.ɵdid(8, 16384, null, 0, i13.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n    \n    "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(11, 0, null, null, 4, "ion-row", [["align-items-center", ""], ["class", "row"], ["justify-content-center", ""], ["style", "height: 40%; color: #fff"]], null, null, null, null, null)), i0.ɵdid(12, 16384, null, 0, i13.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(14, 0, null, null, 0, "img", [["alt", "DSR Reefing"], ["src", "assets/imgs/DSRReefing.png"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵeld(17, 0, null, null, 11, "ion-row", [["align-items-center", ""], ["class", "row"], ["justify-content-center", ""], ["style", "height: 40%"]], null, null, null, null, null)), i0.ɵdid(18, 16384, null, 0, i13.Row, [], null, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_HomePage_1)), i0.ɵdid(21, 16384, null, 0, i14.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      \n    \n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_HomePage_2)), i0.ɵdid(24, 16384, null, 0, i14.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(26, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["v0.1_alpha"])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n    \n  "])), (_l()(), i0.ɵted(-1, 1, ["\n\n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.isLoggedIn; _ck(_v, 21, 0, currVal_2); var currVal_3 = !_co.isLoggedIn; _ck(_v, 24, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 2).statusbarPadding; var currVal_1 = i0.ɵnov(_v, 2)._hasRefresher; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
export function View_HomePage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-home", [], null, null, null, View_HomePage_0, RenderType_HomePage)), i0.ɵdid(1, 49152, null, 0, i15.HomePage, [i11.NavController, i16.AuthServiceProvider], null, null)], null, null); }
var HomePageNgFactory = i0.ɵccf("page-home", i15.HomePage, View_HomePage_Host_0, {}, {}, []);
export { HomePageNgFactory as HomePageNgFactory };
//# sourceMappingURL=home.ngfactory.js.map