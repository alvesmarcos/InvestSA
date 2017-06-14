import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GraphMaker } from '../../util/graph-maker'

import { FirebaseService } from '../../providers/firebase-service';

@Component({
  selector: 'page-market',
	templateUrl: 'market.html'
})
export class MarketPage {
	constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {}
}
