import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController) {}
}