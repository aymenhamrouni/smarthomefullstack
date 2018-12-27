import { GlobalService } from "./../../services/global";
import { AccesoPage } from "./../acceso/acceso";
import { Component } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { StreamfeedPage } from "./../streamfeed/streamfeed";
import { FiresensorsPage } from "../firesensors/firesensors";
import { Socket } from "ng-socket-io";
import { LoginService } from "./../../services/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public isToggled: boolean;
  refresh : boolean=true;
  Home = {
    WindowsSensors_1: ""
  };
  Mono: number = 0;
  Duo: number = 0;
  Temp: number = 0;
  username = this._global.UserName;
  location = this._global.UserLocation;

  constructor(private _service: LoginService,private socket: Socket,public nav: NavController, public popoverCtrl: PopoverController, public _global: GlobalService) {
    this.isToggled = false;
    this.socket.connect();
    this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), msg => {
      this.Home.WindowsSensors_1 = JSON.parse(msg.payload).WindowsSensors_1;
      if(this.refresh) {

      
      if (this.Home.WindowsSensors_1.toString() === "0") {
        this.isToggled = false;
      } else {
        this.isToggled = true;
      }
    }
      this.Mono = JSON.parse(msg.payload).CarbonMonoxide;
      this.Duo = JSON.parse(msg.payload).CarbonDioxide;
      this.Temp = JSON.parse(msg.payload).Temp;
      console.log(msg);
    });
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  goToStreamFeed() {
    this.nav.push(StreamfeedPage);
  }
  goToFireSensor() {
    this.nav.push(FiresensorsPage, {
      mono: this.Mono,
      duo: this.Duo,
      temp: this.Temp
    });
  }

  // go to register page
  acceso() {
    this.nav.setRoot(AccesoPage);
  }

  public notify() {
    this.refresh = false;

    let a: string =
      JSON.parse(localStorage.getItem("userData")).homeId.toString() +
      "_window_1";

    this._service
      .PostDoor(
        { WindowsSensors: Number(this.isToggled).toString(), change: a },
        JSON.parse(localStorage.getItem("userData")).accessToken
      )
      .subscribe(d => {});
    var that = this;
    setTimeout(function() {
      that.refresh = true;
    }, 2000);
  }
}
