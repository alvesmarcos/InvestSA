import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

import { Credential } from '../model/credential'
import firebase from 'firebase';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  loginSuccessEventEmitter:EventEmitter<any>;
  loginFailEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public toastCtrl: ToastController) {

    this.loginSuccessEventEmitter = new EventEmitter();
    this.loginFailEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Usuario esta Logado
        this.callbackSuccessLogin(user);
      } else {
        // No user is signed in.
      }
    });

  }

  loginWithCredential(credential:Credential){
    firebase.auth().signInWithEmailAndPassword(credential.email, credential.password)
      .then(result => {
        this.callbackSuccessLogin(result);
      })
      .catch(error => {
        this.presentToast(error.message);
        this.callbackFailLogin(error);
      });
  }

  logout(){
    firebase.auth().signOut()
      .then(() => this.logoutEventEmitter.emit(true))
      .catch(error => this.logoutEventEmitter.emit(error.message));
  }

  private callbackSuccessLogin(response){
    this.loginSuccessEventEmitter.emit(response.user);
  }

  private callbackFailLogin(error){
    this.loginFailEventEmitter.emit({code : error.code, message : error.message, email: error.email, credential: error.credential});
  }

  private presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
