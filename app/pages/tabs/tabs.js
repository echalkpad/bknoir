import {Page} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
import {Component} from '@angular/core';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  directives: [[CUSTOM_ICON_DIRECTIVES]]
})
export class TabsPage {
  constructor() {
    this.tab2Root = Page2;
    this.tab1Root = Page1;
    this.tab3Root = Page3;
  }
}
