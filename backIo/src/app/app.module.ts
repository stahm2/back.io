import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DiaryPage } from '../pages/diary/diary';
import { TipPage } from '../pages/tip/tip';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {SensorPage} from '../pages/sensor/sensor';
import {TipDetailPage} from '../pages/tip-detail/tip-detail';
import {ExerciseDetailPage} from '../pages/exercise-detail/exercise-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TipPage,
    DiaryPage,
    HomePage,
    SensorPage,
    TipDetailPage,
    ExerciseDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    TipPage,
    HomePage,
    SensorPage,
    TipDetailPage,
    ExerciseDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
