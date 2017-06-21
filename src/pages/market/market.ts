import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { DetailsMarketModal } from './details/details';

@Component({
  selector: 'page-market',
	templateUrl: 'market.html'
})
export class MarketPage  {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

	showDetailsMarket() {
		let modal = this.modalCtrl.create(DetailsMarketModal);
		modal.present();
	}

}
