import {Page, NavController, Alert} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {

  static get parameters() {
    return [[FormBuilder],[NavController], [Http]];
  }

  constructor(formBuilder, nav, http) {
    this.nav = nav;
    this.http = http;
    this.myForm = formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      web_address: [''],
      note: ['']
    });
  }

  presentAlert(){
    let alert = Alert.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    this.nav.present(alert);
  }

  save(){
    console.log(this.myForm.value);
    let alert = Alert.create({
      title: 'Thank YOU',
      subTitle: 'Your listing has been sent to the BKnior Team',
      buttons: ['Ok']
    });
    let body = JSON.stringify(this.myForm.value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/leads/mobile_create?lead[name]=Test&lead[address]=hommy"
    let response = this.http.post(url, options).map(res => res.json()).subscribe(data => {
        console.log(data)
      },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
    this.nav.present(alert);
  }


}

