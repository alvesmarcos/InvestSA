import { LoginPage } from './../pages/login/login';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AnalysisPage } from '../pages/analysis/analysis';
import { MyInvestimentsPage } from '../pages/my-investiments/my-investiments';
import { AttendancePage } from '../pages/attendance/attendance';
import { About } from '../pages/about/about';
import { MarketPage } from '../pages/market/market';
import { InvestimentsPage } from '../pages/investiments/investiments';

import { FirebaseService } from '../providers/firebase-service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  pages: Array<{title: string, component: any, icon: string, active: boolean}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public firebase: FirebaseService,
              public afAuth: AngularFireAuth,
              public ngZone:NgZone,
              public modalCtrl: ModalController) {

    this.initializeApp();

    /* Verifica se usuario esta logado e set Pagina Inicial */
    const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
      this.ngZone.run( () => {
        if (!user) {
          console.log('user not logged');
          //this.rootPage = HomePage;
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          console.log('user logged');
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });

    this.pages = [
      {title: 'Home', component: HomePage, icon: 'home', active: true},
      {title: 'Meus Investimentos', component: MyInvestimentsPage, icon: 'trending-up', active: false},
      {title: 'Investimentos', component: InvestimentsPage, icon: 'stats', active: false},
      {title: 'Expectativas do Mercado', component: MarketPage, icon: 'paper', active: false},
      {title: 'Educacional', component: null, icon: 'bookmarks', active: false},
      {title: 'Análises', component: AnalysisPage, icon: 'analytics', active: false},
      {title: 'Atendimento', component: AttendancePage, icon: 'people', active: false},
      {title: 'Configurações', component: null, icon: 'settings', active: false},
      {title: 'Sobre', component: About, icon: 'information-circle', active: false}
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component == AttendancePage || page.component == About) {
      let modal = this.modalCtrl.create(page.component);
      modal.present();
    } else {
      this.nav.setRoot(page.component);
    }
  }

  logout() {
    this.firebase.logout((isSuccess, response) => {
      if (isSuccess){
        this.nav.setRoot(LoginPage);
        console.log('deslogou');
      }
      else {
        console.log(response);
      }
    });
  }
}
