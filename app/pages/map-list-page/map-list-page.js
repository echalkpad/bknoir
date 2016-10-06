import {NavController, NavParams, Platform } from 'ionic-angular';
import {Component} from '@angular/core';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';


@Component({
  templateUrl: 'build/pages/map-list-page/map-list-page.html',
  directives: [[CUSTOM_ICON_DIRECTIVES]]
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
    let locationOptions = {timeout: 30000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_list_canvas"), mapOptions);
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: "https://s3-us-west-2.amazonaws.com/noirowned/icons/current_location_marker.png"
        });
        items.forEach(function(data){
          latLng = new google.maps.LatLng(data.lat, data.long);
          let marker2 = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: "https://s3-us-west-2.amazonaws.com/noirowned/icons/food_location_markerr.png"
          });

          var contentString = '<div id="marker_id"><h5 id="location-h1">' + data.name + '<span class="button-inner map-item">' + '  ' + data.average_price + '</span></h5><p id="location-address-line1">' + data.address + '</p><p id="location-address-line2">'+ data.city + ', ' + data.state + ', ' + data.zipcode + '</p></div>'

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          marker2.addListener('click', function() {
            infowindow.open(map, marker2);
          });
        });

      },
      (error) => {
        console.log('sdfsdfasdfadsfdsdfdsfadsfasdfa')
        console.log(error.code);
      }, locationOptions
    )

    // console.log("number 2")
    // console.log(map)
    // var myLatLng = new google.maps.LatLng(40.7493918,-73.8838707);
    // var marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'Hello World!'})
  }
}
