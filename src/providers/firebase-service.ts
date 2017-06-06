import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Credential } from '../model/credential';
import { User } from '../model/user';

@Injectable()
export class FirebaseService {

  users:FirebaseListObservable<any>;
  facebookProvider:firebase.auth.FacebookAuthProvider;

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase) {

      this.users = db.list('/users');
      this.facebookProvider = new firebase.auth.FacebookAuthProvider();
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

  loginWithFacebook(isSucess){
    this.afAuth.auth.signInWithPopup(this.facebookProvider)
                    .then(result => isSucess(true, result)).catch(error => isSucess(false, error));
  }

  createUserWithCredential(user:User, credential:Credential, isSucess){
    this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password)
      .then(result => {
        //sucesso! Registrar usuario no RealTimeDB
        this.getCurrentUser().displayName = user.name;
        console.log("User registered: "+user);
        this.users.push(user);
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
