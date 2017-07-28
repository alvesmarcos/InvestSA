import { FirebaseService } from './../../../providers/firebase-service';
import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';

import { Investiment } from '../../../model/investiment';

@Component({
  selector: 'modal-add-investiment',
  templateUrl: 'add.html'
})
export class AddInvestimentModal {
  investiment: Investiment;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public firebaseService: FirebaseService, public toastCtrl: ToastController) {
    this.investiment = navParams.get('investiment');
    this.investiment = new Investiment();
    this.investiment.title = "Tesouro IPCA";
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log(this.investiment);
    this.firebaseService.saveMyInvestiments(this.investiment, result => {
      if (result) {
        // Salvo com sucesso
        this.presentToast('Investimento Salvo com sucesso');
        this.viewCtrl.dismiss(this.investiment);
      }
      else {
        console.log('Error ao salvar investimento: ' + result);
        this.presentToast('Erro no servidor, tente novamente mais tarde.');
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
  
}