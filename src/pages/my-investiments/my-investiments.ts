import { Component, ViewChild,  AfterViewInit, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { Investiment } from '../../model/investiment';
import { PreviewInvestimentModal } from './preview/preview';
import { AddInvestimentModal } from './add/add';

@Component({
  selector: 'page-my-investiments',
  templateUrl: 'my-investiments.html'
})
export class  MyInvestimentsPage implements AfterViewInit {
  @ViewChild('donutCanvas')  donutCanvas: ElementRef;
  donutChart: any;

  investiments: Array<Investiment>;  
  existElement: boolean;
  categories: string;
  counter: Map<string, number>; // Map

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.investiments = []; 
                        // [{title: 'Tesouro PREFIXADO', expirationDate: '15/05/2019', quantityPurchased: 3,
                        //  valueTitle: 0.58, administrationFee: 0.02, purchaseRate: 2.23, purchaseDate: '25/06/2016', 
                        //  paid: 10.20},
                        //  {title: 'Tesouro SELIC', expirationDate: '15/05/2018', quantityPurchased: 1,
                        //  valueTitle: 3.51, administrationFee: 1, purchaseRate: 4.32, purchaseDate: '01/06/2016', 
                        //  paid: 9.15},
                        //  {title: 'Tesouro IPCA', expirationDate: '12/07/2017', quantityPurchased: 6,
                        //  valueTitle: 1.57, administrationFee: 0.21, purchaseRate: 4.10, purchaseDate: '11/06/2015', 
                        //  paid: 7.35}]; 
    this.categories = "geral";
    this.counter = new Map([
      ['Tesouro IPCA', 0],
      ['Tesouro SELIC', 0],
      ['Tesouro PREFIXADO', 0],
      ['CDB', 0],
      ['LCI', 0],
      ['LCA', 0],
    ]);
  }

  ngAfterViewInit() {
     this.checkIfExistElement();
  }

  showDetailsInvestiment(investiment: Investiment) {
    let modal = this.modalCtrl.create(PreviewInvestimentModal, {investiment: investiment});
    modal.present();
  }

  addInvestiment() {
    let modal = this.modalCtrl.create(AddInvestimentModal);
    modal.onDidDismiss(data => {
      if(data!=undefined) {
        this.investiments.push(data);
        this.counter.set(data.title, this.counter.get(data.title) + 1);
      }
      this.checkIfExistElement();
    });
    modal.present();
  }

  private checkIfExistElement() {
    if(this.investiments.length > 0) {
      this.existElement = true;
      this.inflateCharts();
    } else 
      this.existElement = false;
  }

  private inflateCharts() {
    this.donutChart = new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Tesouro IPCA", "Tesouro SELIC", "Tesouro PREFIXADO", "CDB", "LCI", "LCA"], //Fundos
        datasets: [{
          data: [this.counter.get("Tesouro IPCA"), this.counter.get("Tesouro SELIC"), this.counter.get("Tesouro PREFIXADO"),
                 this.counter.get("CDB"), this.counter.get("LCI"), this.counter.get("LCA")],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
          hoverBackgroundColor: [	'rgba(255,99,132,1)','rgba(54, 162, 235, 1)',
					                        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
					                        'rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)']
        }]
      }
    });
  }
}