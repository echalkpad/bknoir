import {Page, NavController} from 'ionic-angular';
import {LocationDetailPage} from '../location-detail/location-detail';
import {MapListPage} from '../map-list-page/map-list-page';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
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
    // this.items = [
    //  {name: "Janique's Place", address: "2151 pacific street", distance: "1.2", avatar: "img/food.jpg", description: "Lorem ipsum dolor sit amet, cibo mundi nam no, hinc fabellas vel in. Pro dicunt admodum at, ad partem feugiat sea. Tale labore ad his, no ludus scripta eos te."},
    //  {name: "Janique's Place", address: "2151 pacific street", distance: "1.2", avatar: "img/food.jpg", description: "Lorem ipsum dolor sit amet, cibo mundi nam no, hinc fabellas vel in. Pro dicunt admodum at, ad partem feugiat sea. Tale labore ad his, no ludus scripta eos te."},
    //  {name: "Janique's Place", address: "2151 pacific street", distance: "1.2", avatar: "img/food.jpg", description: "Lorem ipsum dolor sit amet, cibo mundi nam no, hinc fabellas vel in. Pro dicunt admodum at, ad partem feugiat sea. Tale labore ad his, no ludus scripta eos te."},
    //  {name: "Janique's Place", address: "2151 pacific street", distance: "1.2", avatar: "img/food.jpg", description: "Lorem ipsum dolor sit amet, cibo mundi nam no, hinc fabellas vel in. Pro dicunt admodum at, ad partem feugiat sea. Tale labore ad his, no ludus scripta eos te."},
    //  {name: "Janique's Place", address: "2151 pacific street", distance: "1.2", avatar: "img/food.jpg", description: "Lorem ipsum dolor sit amet, cibo mundi nam no, hinc fabellas vel in. Pro dicunt admodum at, ad partem feugiat sea. Tale labore ad his, no ludus scripta eos te."}
    // ];
    this.items = [];
    this.loadBusinesses();
  }

  itemTapped($event, item){
    this.nav.push(LocationDetailPage, {item: item})
  }

  mapView($event){
    this.nav.push(MapListPage)
  }

  loadBusinesses(){
    let url = "/api";
    let response = this.http.get(url).map(res => res.json()).subscribe(data => {
        this.items = data.businesses;
    });
  }
}
