import {Page, NavParams, Platform, Slides} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/location-detail/location-detail.html',
})

export class LocationDetailPage {
  static get parameters() {
    return [[NavParams], [Platform]];
  }

  // @ViewChild('mySlider') slider: Slides;
  constructor( navParams, platform) {
    this.navParams = navParams;
    this.platform = platform
    this.item = this.navParams.get('item');
    console.log(this.item)
    this.slides = [
      {
        title: "",
        description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
        image: this.item.image_url,
      },
      {
        title: "What is Ionic?",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "https://s-media-cache-ak0.pinimg.com/736x/c3/49/1c/c3491c03a5e84277da884d332129a0b1.jpg",
      },
      {
        title: "What is Ionic Cloud?",
        description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "http://s8.favim.com/orig/150727/black-black-rose-cake-food-Favim.com-3016359.jpg",
      }
    ];

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
}
