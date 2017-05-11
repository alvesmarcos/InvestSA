import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Investiment } from '../../model/investiment';
import { PreviewPage } from './preview/preview';

@Component({
  selector: 'page-my-investiments',
  templateUrl: 'my-investiments.html'
})
export class  MyInvestimentsPage {
  investiments: Array<Investiment>;  
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.investiments = [{title: 'Tesouro Prefixado', expirationDate: '15/05/2019', quantityPurchased: 15,
                         valueTitle: 0.58, administrationFee: 10, purchaseRate: 20, purchaseDate: '25/06/2016', 
                         paid: 0, goal: 'Não definido'},
                         {title: 'Tesouro Selic', expirationDate: '15/05/2018', quantityPurchased: 15,
                         valueTitle: 3.51, administrationFee: 10, purchaseRate: 20, purchaseDate: '01/06/2016', 
                         paid: 0, goal: 'Não definido'},
                         {title: 'Tesouro IPCA', expirationDate: '12/07/2017', quantityPurchased: 15,
                         valueTitle: 1.57, administrationFee: 10, purchaseRate: 20, purchaseDate: '11/06/2015', 
                         paid: 0, goal: 'Não definido'}];
  }

  showDetailsInvestiment() {
    let modal = this.modalCtrl.create(PreviewPage);
    modal.present();
  }
}