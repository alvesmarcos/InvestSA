import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Investiment } from '../../../model/investiment';

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {
  investiment: Investiment;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.investiment = navParams.get('investiment');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}