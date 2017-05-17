import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Investiment } from '../../../model/investiment';

@Component({
  selector: 'modal-add-investiment',
  templateUrl: 'add.html'
})
export class AddInvestimentModal {
  investiment: Investiment;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.investiment = navParams.get('investiment');
    this.investiment = new Investiment();
    this.investiment.title = "Tesouro IPCA";
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log(this.investiment);
    this.viewCtrl.dismiss(this.investiment);
  }
  
}