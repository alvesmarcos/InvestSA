import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { DetailsMarketModal } from './details/details';
import { MarketModel } from '../../model/market.model';
import { MarketService } from '../../providers/market.service';

@Component({
  selector: 'page-market',
	templateUrl: 'market.html'
})
export class MarketPage implements OnInit {
  market: MarketModel;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public marketService: MarketService) {}

  ngOnInit() {
    this.marketService.getIndicators().subscribe(data => {this.market = data; console.log(data)});
  }

	showDetailsMarket() {
		let modal = this.modalCtrl.create(DetailsMarketModal);
		modal.present();
	}
}
