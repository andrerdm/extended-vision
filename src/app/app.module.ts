import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthProvider } from '../providers/auth/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

const firebaseConfig = {
  apiKey: 'AIzaSyA8NPBbRS-mTAnun7G24NgF_lPzhiTmif0',
  authDomain: 'extended-vision-64c3e.firebaseapp.com',
  databaseURL: 'https://extended-vision-64c3e.firebaseio.com',
  projectId: 'extended-vision-64c3e',
  storageBucket: 'extended-vision-64c3e.appspot.com',
  messagingSenderId: '893367303017'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
