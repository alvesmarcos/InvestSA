import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AnalysisPage } from '../pages/analysis/analysis';
import { MyInvestimentsPage } from '../pages/my-investiments/my-investiments';
import { LoginPage } from '../pages/login/login';
import { AttendancePage } from '../pages/attendance/attendance';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any, icon: string, active: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      {title: 'Home', component: HomePage, icon: 'home', active: true},
      {title: 'Meus Investimentos', component: MyInvestimentsPage, icon: 'trending-up', active: false},
      {title: 'Investimentos', component: null, icon: 'stats', active: false},
      {title: 'Expectativas do Mercado', component: null, icon: 'paper', active: false},
      {title: 'Educacional', component: null, icon: 'bookmarks', active: false},
      {title: 'Análises', component: AnalysisPage, icon: 'analytics', active: false},
      {title: 'Atendimento', component: AttendancePage, icon: 'people', active: false},
      {title: 'Configurações', component: null, icon: 'settings', active: false},
      {title: 'Sobre', component: null, icon: 'information-circle', active: false}
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
    this.nav.setRoot(page.component);
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.nav.setRoot(LoginPage))
      .catch(error => console.log(error.message));
  }
}
