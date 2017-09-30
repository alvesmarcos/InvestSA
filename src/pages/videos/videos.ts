import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Video } from '../../model/video.model';
import { VideosService } from '../../providers/videos.service';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage implements OnInit {
  myVideos: Video;

  constructor(public navCtrl: NavController, public videosService: VideosService,  private socialSharing: SocialSharing, public alertCtrl: AlertController,  public loadingCtrl: LoadingController) {
    this.presentLoading();
  }

  ngOnInit() {
    this.videosService.getVideos().subscribe(data => this.myVideos = data);
  }

  regularShare(myVid: Video) {
    this.socialSharing.share(myVid.title, null, myVid.wallpaper, myVid.url);
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Acesse Nosso Canal do YouTube',
      subTitle: 'https://goo.gl/bsmMsw',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando ...",
      duration: 1500
    });
    loader.present();
  }
}
