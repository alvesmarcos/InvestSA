import { Component,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { MarketModel } from '../../../model/market.model';

import { Chart } from 'chart.js';

@Component({
  templateUrl: 'details.html',
  selector: 'details-market-modal'
})
export class DetailsMarketModal implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;
  marketDetails: MarketModel;
  iconToColor: Map<string, string>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.marketDetails = this.navParams.get('marketDetails');
    this.iconToColor = this.navParams.get('iconToColor');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ngAfterViewInit() {
  	this.inflateChart();
  }

  private inflateChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [this.marketDetails.samples[this.marketDetails.samples.length-3].date, 
                 this.marketDetails.samples[this.marketDetails.samples.length-2].date,
                 this.marketDetails.samples[this.marketDetails.samples.length-1].date],
        datasets: [{
          data: [this.marketDetails.samples[this.marketDetails.samples.length-3].value,
                this.marketDetails.samples[this.marketDetails.samples.length-2].value,
                this.marketDetails.samples[this.marketDetails.samples.length-1].value],
          backgroundColor: 'rgba(15, 169, 249, 0.2)',
          borderColor: 'rgba(15, 169, 249, 1)',
					fill: false
        }]
      }, 
			options: {
        legend: {
          display: false
        },
      	scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
					}],
					yAxes: [{
						ticks: {
							beginAtZero:true,
							callback: function(value){return value+ "%"}
						},
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
					}]
				}
			}
    });
  }
}