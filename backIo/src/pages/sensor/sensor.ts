import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SensorProvider } from '../../providers/sensor/sensor';

/**
 * Generated class for the SensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-sensor',
	templateUrl: 'sensor.html',
})
export class SensorPage {
	sensorProvider: SensorProvider;

	constructor(sensorProvider: SensorProvider, public navCtrl: NavController, public navParams: NavParams) {
		this.sensorProvider = sensorProvider;
	}

	connect() {
		this.sensorProvider.discoverAll();
		document.getElementById('explain').textContent = 'Sensor wird verbunden';
		document.getElementById('connectionBtn').hidden = true;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SensorPage');
	}

}
