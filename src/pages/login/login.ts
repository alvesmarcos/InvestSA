import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { LoginService } from '../../providers/login.service';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loginService: LoginService) {

      this.credential = new Credential();
  }

  ionViewDidLoad() {
    // Verifica se o usuario ja esta logado.
    this.loginService.loginSuccessEventEmitter.subscribe(
      user => {
        this.navCtrl.push(HomePage);
        console.log('login.ts success emitter');
      });

    this.loginService.loginFailEventEmitter.subscribe(
      error => console.log(error)
    );
  }

  loginWithCredential(){
    this.loginService.loginWithCredential(this.credential);
  }

  toRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
