import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExerciseDetailPage } from '../exercise-detail/exercise-detail';

/**
 * Generated class for the ExercisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
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
    <button ion-item *ngFor="let item of items" (click)="openExerciseDetailPage(item)" icon-start>
      {{ item.title }}
    </button>
  </ion-list>
</ion-content>
`
})
export class ExercisePage {
  items = [];

  constructor(public nav: NavController) {
    this.items = [
      {
        'title': 'Übung1',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung2',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung3',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung4',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung5',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung6',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung7',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung8',
        'description': 'Exercise Description'
      },
      {
        'title': 'Übung9',
        'description': 'Exercise Description'
      },
    ]
  }

  openExerciseDetailPage(item) {
    this.nav.push(ExerciseDetailPage, { item: item });
  }

}
