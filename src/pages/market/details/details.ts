import { Component,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';

@Component({
  templateUrl: 'details.html',
  selector: 'details-market-modal'
})
export class DetailsMarketModal implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
	lineChart: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

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
        labels: ["03/06", "12/06", "20/06"],
        datasets: [{
          data: [8.41, 7.75, 8.03],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
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