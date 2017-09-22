import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

import { EmailComposer } from '@ionic-native/email-composer';
import { GlobalValidator } from '../../model/GlobalValidator';


@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendancePage {
  masksPhoneNumber: any;
  cadastro : any = {};
  
  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, private viewCtrl: ViewController, public formBuilder : FormBuilder) {
    /*this.masksPhoneNumber = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];*/
    this.cadastro = this.formBuilder.group({
      nome:['', Validators.required],
      email:['', Validators.compose([Validators.required, GlobalValidator.mailFormat])],
      phone:['', Validators.compose([Validators.required, GlobalValidator.phoneFormat])],
      goal:['', Validators.required],
      date:['', Validators.required],
    })
  }

  postDados(){
    console.log(this.cadastro.value);
  }

  sendEmail(){
    let mail = {
      to: 'salaacoes@yahoo.com.br', // coloca teu email aqui pra testar
      cc: this.cadastro.value.email,
      subject: 'Agendamento de Consultoria',
      body: 'Olá meu nome é: '+ this.cadastro.value.nome + ', e eu gostaria de agendar uma consultoria com a sala de ações com o objetivo de falar sobre os seguintes temas: '+
      this.cadastro.value.goal + '. Na seguinte data: ' + this.cadastro.value.date + '. Caso haja alguma dúvida sobre o agendamento do atendimento, favor entrar em contato comigo por email ou pelo telefone: '+ this.cadastro.value.phone + '.',
      isHtml: true
    };
    //console.log(mail);
    this.emailComposer.open(mail);
  }

  closeAttendace() {
    this.viewCtrl.dismiss();
  }
}
