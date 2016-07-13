import { Page, NavController, NavParams, Platform } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map-list-page/map-list-page.html'
})

export class MapListPage {
  static get parameters() {
    return [[NavController],[NavParams],[Platform]];
  }

  constructor(nav, navParams, platform) {
    console.log(this.navParams);
    this.navParams = navParams;
    this.platform = platform;
  }
}
