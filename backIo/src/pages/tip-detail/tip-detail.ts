import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TipDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tip-detail',
  templateUrl: 'tip-detail.html',
})
export class TipDetailPage {
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipDetailPage');
  }

}
