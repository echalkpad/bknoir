import {Page, NavParams, Platform} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/location-detail/location-detail.html',
})

export class LocationDetailPage {
  static get parameters() {
    return [[NavParams], [Platform]];
  }

  constructor( navParams, platform) {
    this.navParams = navParams;
    this.platform = platform
    this.map = null;
    this.item = this.navParams.get('item');
    this.loadMap();
  }

  loadMap(){
    this.platform.ready().then(() => {
      let latLng = new google.maps.LatLng(this.item.lat, this.item.long);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Hello World!'
      });
    });
  }
}
