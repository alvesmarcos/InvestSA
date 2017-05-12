import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { User } from '../../model/user';
import { HomePage } from '../home/home';

import firebase from 'firebase';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credential:Credential;
  user:User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.credential = new Credential();
    this.user = new User();
  }

  ionViewDidLoad() {}

  registerUser(){
    firebase.auth().createUserWithEmailAndPassword(this.credential.email, this.credential.password)
      .then(result => {
        //sucesso! Registrar usuario no RealTimeDB
        console.log(this.user);
        firebase.database().ref('users/').child(result.uid).set(this.user);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log(error.message)
      });

      //Apagar dados - Aellison Tips
      this.credential = null;
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
