import {Page} from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters() {
    return [[FormBuilder]];
  }
  constructor(formBuilder) {

    this.myForm = formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      website: [''],
      note: ['']
    });
  }

  save(){
    console.log(this.myForm.value);
  }
}

