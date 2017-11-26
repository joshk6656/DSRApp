import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http, afAuth) {
        this.http = http;
        this.afAuth = afAuth;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.logout = function (cb) {
        this.afAuth.auth.signOut();
        console.log("User logged off");
        cb(true);
    };
    AuthServiceProvider.prototype.fblogin = function (cb) {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(function (user) {
            console.log("Facebook login worked, using this to login on the server: " + user.user.uid);
            cb(true);
        }).catch(function (err) {
            console.log(err);
            cb(false);
        });
    };
    AuthServiceProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthServiceProvider.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: AngularFireAuth, },
    ]; };
    return AuthServiceProvider;
}());
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map