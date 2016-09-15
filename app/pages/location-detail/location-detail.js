import {Page, NavParams, Platform, Slides} from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';


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
    this.item = this.navParams.get('item');
    var slides = []
    console.log(this.item)
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

      let mapOptions = {
        center: latLng,
        zoom: 14,
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
}
