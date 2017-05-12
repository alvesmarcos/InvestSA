import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Credential } from '../../model/credential'
import { LoginService } from '../../providers/login.service'
import { HomePage } from '../home/home'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService:LoginService) {
    this.credential = new Credential();
  }

  ionViewDidLoad() {
    // Verifica se o usuario ja esta logado.
    this.loginService.loginSuccessEventEmitter.subscribe(
      user => this.navCtrl.setRoot(HomePage));

    this.loginService.loginFailEventEmitter.subscribe(
      error => console.log(error)
    );
  }

  registerUser(){
    this.loginService.signUp(this.credential);
  }

}
