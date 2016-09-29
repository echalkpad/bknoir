import {Platform, ionicBootstrap} from 'ionic-angular';
import {Component} from '@angular/core';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  directives: [CUSTOM_ICON_DIRECTIVES],
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [], {
  // backButtonIcon: '',
  tabsHighlight: true,
});