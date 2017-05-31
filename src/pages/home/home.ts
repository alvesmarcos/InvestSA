import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GraphMaker } from '../../util/graph-maker'

@Component({
  selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('barCanvas') barCanvas;
	barChart: any;
	labels : any;
	label : String;
	data : any;

	constructor(public navCtrl: NavController) {}

	ionViewDidLoad(){
		this.labels = ["Selic", "CDI", "CDB", "Renda Fixa", "LCA/LCI", "Prefixado"];
		this.label = "Porcentagem";
		this.data = [2.77, 3.75, 2.12, -1.69, 2.60, 0.46];

		this.barChart = new GraphMaker(this.labels, this.label, this.data).makeBarGraph(this.barCanvas);
	}
}
