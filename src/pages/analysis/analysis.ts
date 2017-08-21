import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnalysisService } from '../../providers/analysis.service';
import { AnalysisModel } from '../../model/analysis.model';


@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html'
})
export class AnalysisPage implements OnInit {
  analysis: AnalysisModel;

  constructor(public navCtrl: NavController, public analysisService: AnalysisService) {}

  ngOnInit(){
    this.analysisService.getAnalysis().subscribe(data => this.analysis = data);
  }
}
