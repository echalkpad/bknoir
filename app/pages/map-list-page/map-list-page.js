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
      let locationOptions = {timeout: 10000, enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(document.getElementById("map_list_canvas"), mapOptions);

          let marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'Hello World!'
              });
        },
        (error) => {
          console.log(error);
        }, locationOptions
      );
    });
  }
}
