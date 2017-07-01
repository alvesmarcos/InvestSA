import { Component } from '@angular/core';
import { NavController ,MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendancePage {
  cadastro: any = {};
  //private todo : FormGroup;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  postDados(req){
    console.log(req.value);
  }

  closeAttendace() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(HomePage);
  }
}
