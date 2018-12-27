import { GlobalService } from './../../services/global';
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  username = this._global.UserName;
  location = this._global.UserLocation;

  constructor(public nav: NavController, public _global:GlobalService) {
  }

  // logout
  logout() {
    this.nav.setRoot(LoginPage);
  }
}
