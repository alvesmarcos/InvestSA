import { Component } from '@angular/core';
//import { Validators, FormBuilder, NgForm  } from '@angular/forms';
//import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendancePage {
  cadastro: any = {};
  //private todo : FormGroup;

  constructor(/** public formBuilder: FormBuilder**/ ) {
    /**this.cadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      ocupacao: ['', Validators.required]
    });**/
  }
  /**
  postDados(){
    console.log(this.cadastro.value);
  }**/

  postDados(req){
    console.log(req.value);
  }
}
