import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Credential } from '../../model/credential';
import { LoginProvider } from '../../providers/login-provider';
import { MyInvestimentsPage } from '../my-investiments/my-investiments';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loginProvider: LoginProvider) {

      this.credential = new Credential();
  }

  ionViewDidLoad() {
    // Verifica se o usuario ja esta logado.
    this.loginProvider.loginSuccessEventEmitter.subscribe(
      user => this.navCtrl.setRoot(MyInvestimentsPage));

    this.loginProvider.loginFailEventEmitter.subscribe(
      error => console.log(error)
    );
  }

  loginWithCredential(){
    this.loginProvider.loginWithCredential(this.credential);
  }

}
