/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/components/toolbar/toolbar-header";
import * as i2 from "ionic-angular/config/config";
import * as i3 from "ionic-angular/navigation/view-controller";
import * as i4 from "../../../node_modules/ionic-angular/components/toolbar/navbar.ngfactory";
import * as i5 from "ionic-angular/components/toolbar/navbar";
import * as i6 from "ionic-angular/components/app/app";
import * as i7 from "ionic-angular/navigation/nav-controller";
import * as i8 from "../../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory";
import * as i9 from "ionic-angular/components/toolbar/toolbar-title";
import * as i10 from "ionic-angular/components/toolbar/toolbar";
import * as i11 from "../../../node_modules/ionic-angular/components/content/content.ngfactory";
import * as i12 from "ionic-angular/components/content/content";
import * as i13 from "ionic-angular/platform/platform";
import * as i14 from "ionic-angular/platform/dom-controller";
import * as i15 from "ionic-angular/platform/keyboard";
import * as i16 from "ionic-angular/components/card/card";
import * as i17 from "ionic-angular/components/card/card-content";
import * as i18 from "ionic-angular/components/card/card-title";
import * as i19 from "./helpdetails";
import * as i20 from "ionic-angular/navigation/nav-params";
var styles_HelpdetailsPage = [];
var RenderType_HelpdetailsPage = i0.ɵcrt({ encapsulation: 2, styles: styles_HelpdetailsPage, data: {} });
export { RenderType_HelpdetailsPage as RenderType_HelpdetailsPage };
export function View_HelpdetailsPage_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n"])), (_l()(), i0.ɵeld(1, 0, null, null, 10, "ion-header", [], null, null, null, null, null)), i0.ɵdid(2, 16384, null, 0, i1.Header, [i2.Config, i0.ElementRef, i0.Renderer, [2, i3.ViewController]], null, null), (_l()(), i0.ɵted(-1, null, ["\n\n  "])), (_l()(), i0.ɵeld(4, 0, null, null, 6, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, i4.View_Navbar_0, i4.RenderType_Navbar)), i0.ɵdid(5, 49152, null, 0, i5.Navbar, [i6.App, [2, i3.ViewController], [2, i7.NavController], i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, 3, ["\n    "])), (_l()(), i0.ɵeld(7, 0, null, 3, 2, "ion-title", [], null, null, null, i8.View_ToolbarTitle_0, i8.RenderType_ToolbarTitle)), i0.ɵdid(8, 49152, null, 0, i9.ToolbarTitle, [i2.Config, i0.ElementRef, i0.Renderer, [2, i10.Toolbar], [2, i5.Navbar]], null, null), (_l()(), i0.ɵted(-1, 0, ["Vraag en Antwoord"])), (_l()(), i0.ɵted(-1, 3, ["\n  "])), (_l()(), i0.ɵted(-1, null, ["\n\n"])), (_l()(), i0.ɵted(-1, null, ["\n\n\n"])), (_l()(), i0.ɵeld(13, 0, null, null, 17, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i11.View_Content_0, i11.RenderType_Content)), i0.ɵdid(14, 4374528, null, 0, i12.Content, [i2.Config, i13.Platform, i14.DomController, i0.ElementRef, i0.Renderer, i6.App, i15.Keyboard, i0.NgZone, [2, i3.ViewController], [2, i7.NavController]], null, null), (_l()(), i0.ɵted(-1, 1, ["\n\n  "])), (_l()(), i0.ɵeld(16, 0, null, 1, 13, "ion-card", [], null, null, null, null, null)), i0.ɵdid(17, 16384, null, 0, i16.Card, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n   "])), (_l()(), i0.ɵeld(19, 0, null, null, 9, "ion-card-content", [], null, null, null, null, null)), i0.ɵdid(20, 16384, null, 0, i17.CardContent, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(22, 0, null, null, 2, "ion-card-title", [], null, null, null, null, null)), i0.ɵdid(23, 16384, null, 0, i18.CardTitle, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(24, null, ["\n        ", "\n      "])), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵeld(26, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i0.ɵted(27, null, ["\n          ", "\n      "])), (_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵted(-1, null, ["\n  "])), (_l()(), i0.ɵted(-1, 1, ["\n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 5)._hidden; var currVal_1 = i0.ɵnov(_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = i0.ɵnov(_v, 14).statusbarPadding; var currVal_3 = i0.ɵnov(_v, 14)._hasRefresher; _ck(_v, 13, 0, currVal_2, currVal_3); var currVal_4 = _co.question.q; _ck(_v, 24, 0, currVal_4); var currVal_5 = _co.question.a; _ck(_v, 27, 0, currVal_5); }); }
export function View_HelpdetailsPage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-helpdetails", [], null, null, null, View_HelpdetailsPage_0, RenderType_HelpdetailsPage)), i0.ɵdid(1, 49152, null, 0, i19.HelpdetailsPage, [i7.NavController, i20.NavParams], null, null)], null, null); }
var HelpdetailsPageNgFactory = i0.ɵccf("page-helpdetails", i19.HelpdetailsPage, View_HelpdetailsPage_Host_0, {}, {}, []);
export { HelpdetailsPageNgFactory as HelpdetailsPageNgFactory };
//# sourceMappingURL=helpdetails.ngfactory.js.map