import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnalysisPage } from '../pages/analysis/analysis';
import { MyInvestimentsPage } from '../pages/my-investiments/my-investiments';
import { LoginPage } from '../pages/login-page/login-page';
import { LoginProvider } from '../providers/login-provider'

const firebaseConfig = {
  apiKey: "AIzaSyAOeyA8mbblOh2AV_tZp7ykzoP26kjHry4",
  authDomain: "invest-sa.firebaseapp.com",
  databaseURL: "https://invest-sa.firebaseio.com",
  projectId: "invest-sa",
  storageBucket: "invest-sa.appspot.com",
  messagingSenderId: "345135349586"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AnalysisPage,
    MyInvestimentsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnalysisPage,
    MyInvestimentsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
