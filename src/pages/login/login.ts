import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import firebase from 'firebase';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;
  flag:boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {

      this.credential = new Credential();
      this.flag = true;


  }

  ionViewDidLoad() {
    // Verifica se o usuario ja esta logado.
    firebase.auth().onAuthStateChanged(user => {
      if (user && this.flag) {
        // Usuario esta Logado
        console.log('onAuthStateChanged user');
        this.navCtrl.setRoot(HomePage);
        this.flag = false;


      } else {
        // No user is signed in.
        //console.log("usuario nao logado");
      }
    });
  }

  loginWithCredential(){
    firebase.auth().signInWithEmailAndPassword(this.credential.email, this.credential.password)
      .then(result => {
        this.flag = true;
      })
      .catch(error => {
        this.presentToast(error.message);
        console.log(error.message);
      });

      //Apagar dados - Aellison Tips
      this.credential = null;
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
