import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

//import firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../providers/firebase-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public afAuth: AngularFireAuth,
              public af: AngularFireDatabase,
              public firebaseService: FirebaseService) {

      this.credential = new Credential();
      //console.log(this.afAuth.authState)
  }

  ionViewDidLoad() {
    //console.log(this.afAuth.authState)
  }



  loginWithCredential(){
    //console.log(this.afAuth.auth.signInAnonymously());
    this.firebaseService.loginWithCredential(this.credential, (isSuccess, response) => {
      if (isSuccess) {
        console.log(response);
        console.log("Sucesso! Usuario logado "+response.email);
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.presentToast(response);
        console.log('false')
        console.log(response);
      }
    });
  }

  toRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
