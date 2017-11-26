import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
    public isLoggedIn: Boolean;
    public user_displayName: String;
    public user_uid: String;
    public user_email: String;

  constructor(public http: HttpClient, private afAuth: AngularFireAuth,) {
    console.log('Hello AuthServiceProvider Provider');
  }

  logout(cb) {
    this.afAuth.auth.signOut();
    console.log("User logged off");
    cb(true)
  }

  fblogin(cb) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
      console.log("Facebook login worked, using this to login on the server: " + user.user.uid);
      cb(true);
    }) .catch(err => {
      console.log(err);
      cb(false);
    })
  }

}
