import { Component } from '@angular/core';
import { NavController ,MenuController } from 'ionic-angular';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomePage } from '../home/home';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendancePage {
  cadastro: any = {};
  //private todo : FormGroup;
  dataEmail = {
    fullname: '',
    Email: '',
    phone: '',
    goals: '',
    date: '',
  }

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private emailComposer: EmailComposer) {
    this.menuCtrl.enable(false);
  }

  postDados(req){
    console.log(req);
  }

  sendEmail(){
    let email = {
      to: 'diego.filipe@cc.ci.ufpb.br', // coloca teu email aqui pra testar
      cc: this.dataEmail.Email,
      subject: 'Agendamento de Consultoria',
      body: 'Olá meu nome é: '+ this.dataEmail.fullname + ', e eu gostaria de agendar uma consultoria com a sala de ações na seguinte data: '
      + this.dataEmail.date + '. Favor entrar em contato comigo por email ou pelo telefone: '+ this.dataEmail.phone + '.',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  closeAttendace() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(HomePage);
  }
}
