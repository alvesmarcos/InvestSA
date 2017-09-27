import { ConnectivityService } from './../../providers/connectivity-service';
import { Network } from '@ionic-native/network';
import { FirebaseService } from './../../providers/firebase-service';
import { Component, ViewChild,  AfterViewInit, ElementRef } from '@angular/core';
import { NavController, ModalController, LoadingController, Loading, ToastController } from 'ionic-angular';
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
  loading: Loading;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
              public firebaseService: FirebaseService, public loadingCtrl: LoadingController,
              private network: Network, public toastCtrl: ToastController, public connectivityService: ConnectivityService) {
    
    // Recupera investimentos do usuario atual

    // this.investiments =  
    //                     [{title: 'Tesouro PREFIXADO', expirationDate: '15/05/2019', quantityPurchased: 3,
    //                      valueTitle: 0.58, administrationFee: 0.02, purchaseRate: 2.23, purchaseDate: '25/06/2016', 
    //                      paid: 10.20},
    //                      {title: 'Tesouro SELIC', expirationDate: '15/05/2018', quantityPurchased: 1,
    //                      valueTitle: 3.51, administrationFee: 1, purchaseRate: 4.32, purchaseDate: '01/06/2016', 
    //                      paid: 9.15},
    //                      {title: 'Tesouro IPCA', expirationDate: '12/07/2017', quantityPurchased: 6,
    //                      valueTitle: 1.57, administrationFee: 0.21, purchaseRate: 4.10, purchaseDate: '11/06/2015', 
    //                      paid: 7.35}]; 
    this.investiments = [];
    this.existElement = true;
    this.categories = "geral";
    this.counter = new Map([
      ['CDB', 0],
      ['LCI', 0],
      ['LCA', 0],
    ]);
  }

  ionViewDidLoad(){
    // if (this.connectivityService.isOnline()) {
    //   this.presentToast('Voce esta conectado!')
    // }
    // else {
    //   this.presentToast('Voce esta offline!')
    // }
  }

  ngAfterViewInit() {
    Chart.defaults.global.legend.labels.usePointStyle = true;

    if (this.connectivityService.isOnline()) {
      this.createLoader('Carregando Meus Investimentos...')
      this.loading.present().then(() => {
        this.firebaseService.getMyInvestiments(myInv => {
          this.investiments = myInv;
          this.checkIfExistElement();
          this.loading.dismiss();
        });  
      });
    }
    else {
      this.presentToast('Erro! Conecte-se à internet e tente novamente!')
    }
    

  }

  refreshPage() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  showDetailsInvestiment(investiment: Investiment) {
    let modal = this.modalCtrl.create(PreviewInvestimentModal, {investiment: investiment});
    
    modal.onDidDismiss(data => {
      if (data)
        this.refreshPage()
    })
    
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
      this.inflateChart();
    } else 
      this.existElement = false;
  }

  private inflateChart() {
    this.donutChart = new Chart(this.donutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ["CDB", "LCI", "LCA"], //Fundos
        datasets: [{
          data: [this.counter.get("CDB"), this.counter.get("LCI"), this.counter.get("LCA")],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'],
          hoverBackgroundColor: [	'rgba(255,99,132,1)','rgba(54, 162, 235, 1)',
					                        'rgba(255, 206, 86, 1)']
        }]
      }
    });
  }

  // Helper Functions
  createLoader(message: string = "Carregando...") { // Optional Parameter
     this.loading = this.loadingCtrl.create({
       content: message,
       spinner: 'crescent'
     });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }  
}