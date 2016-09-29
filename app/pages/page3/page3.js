import {Component} from '@angular/core';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';


@Component({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [[CUSTOM_ICON_DIRECTIVES]]
})
export class Page3 {
  constructor() {
    // window.open("https://medium.com/@noirowned", '_system', "location=true");
  }
}
