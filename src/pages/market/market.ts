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
	iconToColor: Map<string, string>;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public marketService: MarketService) {
		this.iconToColor = new Map();

		this.iconToColor.set('arrow-round-down','danger');
		this.iconToColor.set('arrow-round-up','free');	
		this.iconToColor.set('remove','dark')
	}

  ngOnInit() {
    this.marketService.getIndicators().subscribe(data => {this.market = data; console.log(data)});
  }

	showDetailsMarket(market) {
		let modal = this.modalCtrl.create(DetailsMarketModal, {marketDetails: market, iconToColor: this.iconToColor});
		modal.present();
	}
}
