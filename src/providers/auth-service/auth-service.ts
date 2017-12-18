import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Platform, AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

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
    public user_birthday: String;
    public user_name: String;

  constructor(public http: HttpClient, private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, private googlePlus: GooglePlus, public alertController : AlertController) {
    console.log('Hello AuthServiceProvider Provider');
  }

  logout(cb) {
    this.afAuth.auth.signOut();
    console.log("User logged off");
    cb(true)
  }

  displayAlert(value,title)
  {
      let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
                    {
                        text: "OK"
                    }
               ]
      });
      coolAlert.present();
 
  }

  googleLogin(cb) {
    if (this.platform.is('cordova')) {
      let me = this
      this.googlePlus.login({'webClientId': '820818360210-bmp20pkjamrnehco7h3lv3osk0ql6mkg.apps.googleusercontent.com'}).then(userData => {
         var token = userData.idToken;
         const googleCredential = firebase.auth.GoogleAuthProvider.credential(token, null);
         firebase.auth().signInWithCredential(googleCredential).then((success) => {
           console.log("Firebase success: " + JSON.stringify(success));
          cb(true);
         })
         .catch((error) => {
           console.log("Firebase failure: " + JSON.stringify(error));
               me.displayAlert(error,"signInWithCredential failed")
               cb(false);
         });
       }).catch((gplusErr) => {
          console.log("GooglePlus failure: " + JSON.stringify(gplusErr));
          this.displayAlert(JSON.stringify(gplusErr),"GooglePlus failed")
          cb(false);
       });
     } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
        console.log("Google login worked, using this to login on the server: " + JSON.stringify(user));
        cb(true);
      }).catch(err => {
        console.log(err);
        cb(false);
      });
     }
  }

  fblogin(cb) {
    if (this.platform.is('cordova')) {
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        if (firebase.auth().signInWithCredential(facebookCredential)) {
          console.log("Facebook native login worked");
          cb(true);
        }
      }) .catch(err => {
        console.log(err);
        cb(false);
      })
    }
    else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
        console.log("Facebook login worked, using this to login on the server: " + user.user.uid);
        cb(true);
      }).catch(err => {
        console.log(err);
        cb(false);
      });
    }
  }

}
