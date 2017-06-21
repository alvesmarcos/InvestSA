import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'investiments.html',
  selector: 'page-investiments'
})
export class InvestimentsPage {
  categories: String;

  constructor(public navCtrl: NavController) {
    this.categories = "rendafixa";
  }
}