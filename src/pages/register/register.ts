import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { User } from '../../model/user';
import { HomePage } from '../home/home';

import { FirebaseService } from '../../providers/firebase-service';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  credential:Credential;
  user:User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public firebaseService: FirebaseService) {
    this.credential = new Credential();
    this.user = new User();
  }

  ionViewDidLoad() {}

  registerUser(){
    this.firebaseService.createUserWithCredential(this.user, this.credential, (isSuccess, response) => {
      if (isSuccess) {
        this.presentToast('Conta criada com sucesso!');
        console.log(response);
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.presentToast(JSON.stringify(response));
        console.log(response);
      }
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  closeRegister() {
    this.navCtrl.pop();
  }
}
