import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  closeAbout() {
     this.navCtrl.setRoot(HomePage);
  }
}