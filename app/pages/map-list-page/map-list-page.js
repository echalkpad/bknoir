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
    this.loadMap();
  }

  loadMap(){
    this.platform.ready().then(() => {
      let latLng = new google.maps.LatLng(-34.9290, 138.6070);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(document.getElementById("map_list_canvas"), mapOptions);
    });
  }
}
