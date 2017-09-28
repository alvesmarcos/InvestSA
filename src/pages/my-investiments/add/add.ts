import { FirebaseService } from './../../../providers/firebase-service';
import { Component } from '@angular/core';
import { NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';

import { Investiment } from '../../../model/investiment';

@Component({
  selector: 'modal-add-investiment',
  templateUrl: 'add.html'
})
export class AddInvestimentModal {
  investiment: Investiment;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,
              public firebaseService: FirebaseService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.investiment = navParams.get('investiment');
    this.investiment = new Investiment();
    this.investiment.purchaseDate = 'dd/mm/aaaa';
    this.investiment.expirationDate = 'dd/mm/aaaa';
    this.investiment.administrationFee = 0.0;
    this.investiment.quantityPurchased = 0;
    this.investiment.valueTitle = 0.0;
    this.investiment.paid = 0;
    this.investiment.title = "CDB";
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
  // --
  // TODO: Parametrizer funcoes do prompt
  // ---
  doPromptQtd() {
    let prompt = this.alertCtrl.create({
      title: 'Qtd. Comprada',
      message: "Insira a quantidade que deseja investir no título",
      inputs: [
        {
          name: 'quantidade',
          placeholder: '0',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.quantityPurchased = data.quantidade;
            this.investiment.paid = this.investiment.valueTitle * this.investiment.quantityPurchased;
          }
        }
      ]
    });
     prompt.present();
  }

  doPromptPurchaseDate() {
    let prompt = this.alertCtrl.create({
      title: 'Data da compra',
      message: "Insira a data da compra do título",
      inputs: [
        {
          name: 'date',
          placeholder: 'dd/mm/aaaa',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.purchaseDate = data.date;
          }
        }
      ]
    });
     prompt.present();
  }

  doPromptExpirationDate() {
    let prompt = this.alertCtrl.create({
      title: 'Data de vencimento',
      message: "Insira a data de vencimento do título",
      inputs: [
        {
          name: 'date',
          placeholder: 'dd/mm/aaaa',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.expirationDate = data.date;
          }
        }
      ]
    });
     prompt.present();
  }

  doPromptAdministrationFee() {
    let prompt = this.alertCtrl.create({
      title: 'Taxa de administração',
      message: "Insira o valor da taxa de administração",
      inputs: [
        {
          name: 'value',
          placeholder: '0.00',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.administrationFee = data.value;
          }
        }
      ]
    });
     prompt.present();
  }
  
  doPromptPurchaseRate() {
    let prompt = this.alertCtrl.create({
      title: 'Taxa de compra',
      message: "Insira o valor da taxa de compra",
      inputs: [
        {
          name: 'value',
          placeholder: '0.00',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.purchaseRate = data.value;
          }
        }
      ]
    });
     prompt.present();
  }

  doPromptValueTitle() {
    let prompt = this.alertCtrl.create({
      title: 'Valor do título',
      message: "Insira o valor do título",
      inputs: [
        {
          name: 'value',
          placeholder: '0.00',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.investiment.valueTitle = data.value;
            this.investiment.paid = this.investiment.valueTitle * this.investiment.quantityPurchased;
          }
        }
      ]
    });
     prompt.present();
  }
}