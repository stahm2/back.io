import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TipDetailPage } from '../tip-detail/tip-detail';

/**
 * Generated class for the TipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
@Component({
  template: `
<ion-header>
  <ion-navbar>
    <ion-title>Navigation</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <button ion-item *ngFor="let item of items" (click)="openTipDetailPage(item)" icon-start>
      {{ item.title }}
    </button>
  </ion-list>
</ion-content>
`
})
export class TipsPage {


  items = [];

  constructor(public nav: NavController) {
    this.items = [
      {
        'title': 'Tip1',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip2',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip3',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip4',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip5',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip6',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip7',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip8',
        'description': 'Tip Description'
      },
      {
        'title': 'Tip9',
        'description': 'Tip Description'
      },
    ]
  }

  openTipDetailPage(item) {
    this.nav.push(TipDetailPage, { item: item });
  }

}
