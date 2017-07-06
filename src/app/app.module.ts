import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnalysisPage } from '../pages/analysis/analysis';
import { MyInvestimentsPage } from '../pages/my-investiments/my-investiments';
import { PreviewInvestimentModal } from '../pages/my-investiments/preview/preview';
import { AddInvestimentModal } from '../pages/my-investiments/add/add';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AttendancePage } from '../pages/attendance/attendance';
import { About } from '../pages/about/about';
import { MarketPage } from '../pages/market/market';
import { DetailsMarketModal } from '../pages/market/details/details';
import { InvestimentsPage } from '../pages/investiments/investiments';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from '../providers/firebase-service';
import { Facebook } from '@ionic-native/facebook';

import { EmailComposer } from '@ionic-native/email-composer';

export const firebaseConfig = {
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
    LoginPage,
    RegisterPage,
    PreviewInvestimentModal,
    AttendancePage,
    AddInvestimentModal,
    About,
    MarketPage,
    DetailsMarketModal,
    InvestimentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnalysisPage,
    MyInvestimentsPage,
    LoginPage,
    RegisterPage,
    PreviewInvestimentModal,
    AttendancePage,
    AddInvestimentModal,
    About,
    MarketPage,
    DetailsMarketModal,
    InvestimentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmailComposer
  ]
})
export class AppModule {
  constructor(){}
}
