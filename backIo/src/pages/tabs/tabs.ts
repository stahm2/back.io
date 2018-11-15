import { Component } from '@angular/core';

import { DiaryPage } from '../diary/diary';
import { TipPage } from '../tip/tip';
import { HomePage } from '../home/home';
import { SensorPage} from '../sensor/sensor';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DiaryPage;
  tab3Root = TipPage;
  tab4Root = SensorPage;

  constructor() {

  }
}
