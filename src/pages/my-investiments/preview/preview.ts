import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}
}