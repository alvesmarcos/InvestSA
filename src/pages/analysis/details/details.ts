import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'modal-details-analysis',
  templateUrl: 'details.html'
})
export class DetailsAnalysis {
  title: string;
  images: Array<string>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.images = this.navParams.get('images');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}