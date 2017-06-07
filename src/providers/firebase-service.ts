import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import firebase from 'firebase';
import { Credential } from '../model/credential';
import { User } from '../model/user';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class FirebaseService {

  users:FirebaseListObservable<any>;
  userProfile: any = null;

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase, private fb: Facebook) {

      this.users = db.list('/users');
  }

  loginWithCredential(credential:Credential, isSuccess){
    this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password)
      .then(result => {
        isSuccess(true, result);
      })
      .catch(error => {
        isSuccess(false, error);
      });
  }

  loginWithFacebook(isSucess): void{

    this.fb.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            isSucess(true, success);
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            isSucess(false, error);
        });

    }).catch((error) => { console.log(error); isSucess(false, error); });

    // this.fb.login(['email'])
    //  .then((_response) => {
    //    console.log(_response);
    //    var creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken);
    //    return this.afAuth.auth.signInWithCredential(creds);
    //  }).then((authData) => {
    //    console.log(authData);
    //    isSucess(true, authData);
    //  }).catch((error) => {
    //    console.log(error);
    //    isSucess(false, error);
    //  });
  }

  createUserWithCredential(user:User, credential:Credential, isSucess){
    this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password)
      .then(result => {
        //sucesso! Registrar usuario no RealTimeDB
        console.log("User registered: "+user);
        this.users.push(user).then(result => console.log("Salvo com sucesso no DB")).catch(error => console.log(error));
        isSucess(true, result);
      })
      .catch(error => {
        isSucess(false, error);
      });
  }

  logout(isSuccess){
    this.afAuth.auth.signOut()
      .then(isSuccess(true))
      .catch(error => {isSuccess(false, error)});
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

}
