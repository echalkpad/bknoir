import {Page, NavController} from 'ionic-angular';
import {LocationDetailPage} from '../location-detail/location-detail';
import {MapListPage} from '../map-list-page/map-list-page';
// import {DefaultImage} from '../../pipes/default-image';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  // pipes: [DefaultImage]
})


export class Page1{
  static get parameters() {
    return [[NavController], [Http]];
  }

  constructor(nav, http) {
    this.ext_page = { component: LocationDetailPage };
    this.ext_map_page = { component: MapListPage };
    this.nav = nav;
    this.http = http;
    this.items = [];
    this.items_dup = [];
    this.loadBusinesses();
  }

  itemTapped($event, item){
    this.nav.push(LocationDetailPage, {item: item})
  }

  mapView($event, items){
    this.nav.push(MapListPage,{items: items})
  }

  loadBusinesses(){
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/businesses/mobile_index";
    let response = this.http.get(url).map(res => res.json()).subscribe(data => {
        this.items = data.businesses;
        this.items.forEach(function(data){
          console.log(data.image_url.length == null)
          if(data.image_url.length == 281){
            data.image_url = "https://pixabay.com/static/uploads/photo/2016/08/12/10/50/cutlery-1588097__340.png";
          }
        })
        this.items_dup = data.businesses;
      },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
  }

  searchLocationsDB(event){
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/businesses/search?q=" + event.target.value;
    let response = this.http.get(url).map(res => res.json()).subscribe(data => {
      this.items = data.businesses;
    },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
  }

  onCancel(event){
    this.items = this.items_dup;
  }
}
