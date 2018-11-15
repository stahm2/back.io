import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  connect() {
    // put some code here

    document.getElementById('explain').textContent = 'Sensor wird verbunden';
    document.getElementById('connectionBtn').hidden = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorPage');
  }

}
