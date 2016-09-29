import {NavParams, Platform, Slides} from 'ionic-angular';
import {Component} from '@angular/core';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';
import { InAppBrowser } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/location-detail/location-detail.html',
  directives: [[CUSTOM_ICON_DIRECTIVES]]
})

export class LocationDetailPage {
  static get parameters() {
    return [[NavParams], [Platform]];
  }

  constructor( navParams, platform) {
    this.navParams = navParams;
    this.platform  = platform
    this.item      = this.navParams.get('item');
    var slides     = []
    this.item.images.forEach(function(data){
      let slide = {
        title: data.title,
        description: data.description,
        image: data.url
      }
      slides.push(slide);
    });
    this.slides = slides
    this.map = null;
    this.loadMap();
    this.mySlideOptions = {
      initialSlide: 1,
      loop: true
    };
  }

  loadMap(){
    this.platform.ready().then(() => {
      let latLng = new google.maps.LatLng(this.item.lat, this.item.long);
      var goldStar = {
          path: 'M511.024,258.047c0,139.585-113.159,252.745-252.755,252.745c-139.573,0-252.733-113.16-252.733-252.745c0-139.584,113.16-252.744,252.733-252.744C397.865,5.303,511.024,118.462,511.024,258.047z',
          fill: "#DE1D25",
          fillOpacity: 1,
          scale: 1,
        };

      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: "https://s3-us-west-2.amazonaws.com/noirowned/icons/food_location_markerr.png"
      });
    });
  }

  launch(url,item) {
    this.platform.ready().then(() => {
      window.open(item.http_url, '_system', "location=true");
      // cordova.InAppBrowser.open(url, "_system", "location=true");
    });
  }

  lauchDirections($event, item){
    let destination = item.lat + ',' + item.long;
    // window.open("http://maps.google.com/?q=" + destination, '_system');
    if(this.platform.is('ios')){
      window.open('maps://?q='+item.name+ '&ll' + destination, '_system');
    } else {
      let label = encodeURI(item.name);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

  doRefresh(refresher) {
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/businesses/mobile_index";
    let response = this.http.get(url).map(res => res.json()).subscribe(data => {
        this.items = data.businesses;
        this.items_dup = data.businesses;
      },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
    setTimeout(() => {
      refresher.complete();
    }, 600)
  }
}
