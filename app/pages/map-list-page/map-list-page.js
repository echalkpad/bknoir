import { Page, NavController, NavParams, Platform } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map-list-page/map-list-page.html'
})

export class MapListPage {
  static get parameters() {
    return [[NavController],[NavParams],[Platform]];
  }

  constructor(nav, navParams, platform) {
    this.navParams = navParams;
    this.platform = platform;
    this.items = this.navParams.get('items');
    this.loadMap();
  }

  loadMap(){
    var items = this.items
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_list_canvas"), mapOptions);
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'Hello World!'
        });
        items.forEach(function(data){
          latLng = new google.maps.LatLng(data.lat, data.long);
          let marker2 = new google.maps.Marker({
            position: latLng,
            map: map,
            label: data.name[0]
          });

          var contentString = '<div id="marker_id"><h1>' + data.name + '</h1></div>'
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          marker2.addListener('click', function() {
            infowindow.open(map, marker2);
          });
        });

      },
      (error) => {
        console.log(error);
      }, locationOptions
    )

    // console.log("number 2")
    // console.log(map)
    // var myLatLng = new google.maps.LatLng(40.7493918,-73.8838707);
    // var marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!'})
  }
}
