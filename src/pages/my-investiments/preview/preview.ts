import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { Investiment } from '../../../model/investiment';
import { FirebaseService } from './../../../providers/firebase-service';

@Component({
  selector: 'modal-preview-investiment',
  templateUrl: 'preview.html'
})
export class PreviewInvestimentModal {
  investiment: Investiment;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, 
              public firebaseService: FirebaseService, public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
    this.investiment = navParams.get('investiment');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  delete(investiment: Investiment){
    this.presentConfirm('Deletar Investimento', 
                        'Você deseja realmente deletar este investimento?',
                        () => this.removeInvestiment(investiment), null)
    
  }

  removeInvestiment(investiment: Investiment) {
    this.firebaseService.removeMyInvestiment(investiment, 
      result => {
        if (result)
          this.presentToast('Sucesso ao excluir o investimento!')        
        else
          this.presentToast('Erro ao excluir o investimento! '+result)
        this.viewCtrl.dismiss(investiment);
      })
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  presentConfirm(title, message, confirmHandler, cancelHandler) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelHandler
        },
        {
          text: 'Confirmar',
          handler: confirmHandler
        }
      ]
    });
    alert.present();
  }
  
}