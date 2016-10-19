import {NavController, Alert} from 'ionic-angular';
import {Component} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/page2/page2.html',
  directives: [[CUSTOM_ICON_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]]
})
export class Page2 {

  static get parameters() {
    return [[FormBuilder],[NavController],[Http]];
  }

  constructor(formBuilder, nav, http) {
    this.nav = nav;
    this.http = http;
    this.formBuilder = formBuilder
  }

  ionViewLoaded() {
    this.myForm = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      web_address: [''],
      note: ['']
    });
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  save(){
    // let alertSuccess = this.alertCtrl.create({
    //   title: 'Thank You',
    //   subTitle: 'Your listing has been sent to the BKnior Team',
    //   buttons: ['Ok']
    // });
    let body = JSON.stringify(this.myForm.value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "https://invulnerable-mandarine-47296.herokuapp.com/leads/mobile_create?lead[name]=" +
      this.myForm.value.name +
      "&lead[address]=" +
      this.myForm.value.address +
      "&lead[phone]=" +
      this.myForm.value.phone +
      "&lead[web_address]=" +
      this.myForm.value.web_address +
      "&lead[note]=" +
      this.myForm.value.note;
    let response = this.http.post(url, options).map(res => res.json()).subscribe(data => {
        // alertSuccess.present();
        console.log('success')
      },
      (res) => console.log("res", res),
      err => console.log('error', err)
    );
  }

  clearForm(){
    this.myForm = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      web_address: [''],
      note: ['']
    });
  }
}


