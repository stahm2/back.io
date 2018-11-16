import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DiaryPage } from '../pages/diary/diary';
import { TipPage } from '../pages/tip/tip';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SensorPage } from '../pages/sensor/sensor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SensorProvider } from '../providers/sensor/sensor';

@NgModule({
<<<<<<< master
	declarations: [
		MyApp,
		TipPage,
		DiaryPage,
		HomePage,
		SensorPage,
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
		TabsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
=======
  declarations: [
    MyApp,
    TipPage,
    DiaryPage,
    HomePage,
    SensorPage,
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SensorProvider
  ]
>>>>>>> Generated provider for the sensor service
})
export class AppModule { }
