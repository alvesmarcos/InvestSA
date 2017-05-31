import { Chart } from 'chart.js';

export class GraphMaker{
    labels : any;
    label : String;
    data : any
    constructor(labels, label, data){
        this.labels = labels;
        this.label = label;
        this.data = data;
    }

    makeBarGraph(barCanvas){
        return new Chart(barCanvas.nativeElement, {
			type: 'bar',
			data: {
				labels: this.labels,
				datasets: [{
					label: this.label,
					data: this.data,
					backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)'
					],
					borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)'
					],
					borderWidth: 1
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

    makeDoughnutsGraph(doughnutCanvas){
       return new Chart(doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: [{
                    label: this.label,
                    data: this.data,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)'
                    ],
                    hoverBackgroundColor: [
                    'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)'
                    ]
                }]
            }
 
        });
    }

    makeLineGraph(lineCanvas){
        new Chart(lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.label,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.data,
                        spanGaps: false,
                    }
                ]
            }
 
        });
    }
}