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
    let alertSuccess = Alert.create({
      title: 'Thank You',
      subTitle: 'Your listing has been sent to the BKnior Team',
      buttons: ['Ok']
    });
    let body = JSON.stringify(this.myForm.value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/leads/mobile_create?lead[name]=" +
      this.myForm.value.name +
      "&lead[address]=" +
      this.myForm.value.address +
      "&lead[phone]=" +
      this.myForm.value.phone  +
      "&lead[web_address]=" +
      this.myForm.value.web_address +
      "&lead[note]=" +
      this.myForm.value.note;
    let response = this.http.post(url, options).map(res => res.json()).subscribe(data => {
        this.nav.present(alertSuccess);
      },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
  }
}

// Page2.prototype = {
//     clearForm: function(){
//       this.myForm.name = '';
//     }
//   }

