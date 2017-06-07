import { Component} from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

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
              public firebaseService: FirebaseService) {

      this.credential = new Credential();

  }

  ionViewDidLoad() {}

  loginWithCredential(){
    this.firebaseService.loginWithCredential(this.credential, (isSuccess, response) => {
      if (isSuccess) {
        // console.log(response);
        // console.log("Sucesso! Usuario logado");
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.presentToast(JSON.stringify(response));
        // console.log('error')
        // console.log(response);
      }
    });
  }

  loginWithFacebook(){
    this.firebaseService.loginWithFacebook((isSucess, response) => {
      this.presentToast('Response: '+JSON.stringify(response));
      if (isSucess) {
        // console.log(response);
        // console.log("Sucesso! Usuario logado");
        this.presentToast(JSON.stringify(response));
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.presentToast(JSON.stringify(response));
        // console.log('error')
        // console.log(response);
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
