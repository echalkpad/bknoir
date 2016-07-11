import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/location-detail/location-detail.html',
})

export class LocationDetailPage {
  static get parameters() {
    return [[ NavParams]];
  }
  constructor( navParams) {
    this.navParams = navParams;
    this.item = this.navParams.get('item')
  }
}
