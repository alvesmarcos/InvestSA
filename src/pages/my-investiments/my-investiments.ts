import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Investiment } from '../../model/investiment';
import { PreviewInvestimentModal } from './preview/preview';
import { AddInvestimentModal } from './add/add';

@Component({
  selector: 'page-my-investiments',
  templateUrl: 'my-investiments.html'
})
export class  MyInvestimentsPage {
  investiments: Array<Investiment>;  
  existElement: boolean;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.investiments = [];
                    /*   [{title: 'Tesouro Prefixado', expirationDate: '15/05/2019', quantityPurchased: 3,
                         valueTitle: 0.58, administrationFee: 0.02, purchaseRate: 2.23, purchaseDate: '25/06/2016', 
                         paid: 10.20},
                         {title: 'Tesouro Selic', expirationDate: '15/05/2018', quantityPurchased: 1,
                         valueTitle: 3.51, administrationFee: 1, purchaseRate: 4.32, purchaseDate: '01/06/2016', 
                         paid: 9.15},
                         {title: 'Tesouro IPCA', expirationDate: '12/07/2017', quantityPurchased: 6,
                         valueTitle: 1.57, administrationFee: 0.21, purchaseRate: 4.10, purchaseDate: '11/06/2015', 
                         paid: 7.35}]; */
  }

  showDetailsInvestiment(investiment: Investiment) {
    let modal = this.modalCtrl.create(PreviewInvestimentModal, {investiment: investiment});
    modal.present();
  }

  addInvestiment() {
    let modal = this.modalCtrl.create(AddInvestimentModal);
    modal.onDidDismiss(data => {
      if(data==undefined)
        this.existElement = false;
      else {
        this.investiments.push(data);
        this.existElement = true;
      }
    });
    modal.present();
  }
}