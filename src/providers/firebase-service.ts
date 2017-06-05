import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Credential } from '../model/credential';
import { User } from '../model/user';

@Injectable()
export class FirebaseService {

  users:FirebaseListObservable<any>;

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase) {

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

  createUserWithCredential(user:User, credential:Credential, isSucess){
    this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password)
      .then(result => {
        //sucesso! Registrar usuario no RealTimeDB
        console.log(user);
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
}
