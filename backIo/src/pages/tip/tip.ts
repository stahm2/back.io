import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-tip',
  templateUrl: 'tip.html'
})


export class TipPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  openTips(){
    this.navCtrl.push('TipsPage');
  }
  openExercise(){
    this.navCtrl.push('ExercisePage');
  }
}
