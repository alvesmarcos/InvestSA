import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AnalysisService } from '../../providers/analysis.service';
import { AnalysisModel } from '../../model/analysis.model';
import { DetailsAnalysis } from './details/details';


@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html'
})
export class AnalysisPage implements OnInit {
  analysis: AnalysisModel;

  constructor(public navCtrl: NavController, public analysisService: AnalysisService, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.presentLoading();
  }

  ngOnInit(){
    this.analysisService.getAnalysis().subscribe(data => this.analysis = data);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando ...",
      duration: 1500
    });
    loader.present();
  }

  showDetailsAnalysis(analys: AnalysisModel) {
    let modal = this.modalCtrl.create(DetailsAnalysis, {title: analys.title, images: analys.images});
    console.log('chamou ein');
    modal.present();
  }
}
