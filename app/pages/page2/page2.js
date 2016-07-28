import {Page, NavController, Alert} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http} from '@angular/http';
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

    this.myForm = formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      website: [''],
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
    this.nav.present(alert);
  }


}

