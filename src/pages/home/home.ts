import { GlobalService } from "./../../services/global";
import { AddUserPage } from "./../addUser/addUser";
import { Component } from "@angular/core";
import { NavController, PopoverController, Nav } from "ionic-angular";
import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { StreamfeedPage } from "./../streamfeed/streamfeed";
import { FiresensorsPage } from "../firesensors/firesensors";
import { Socket } from "ng-socket-io";
import { LoginService } from "./../../services/login";
import { DoorsPage } from "../doors/doors";
import { WindowsPage } from "../windows/windows";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public isToggled: boolean;
  WindowsSensors = [];
  DoorsSensors = [];
  refresh: boolean = true;
  Home = {
    Alarm: ""
  };
  Mono: number = 0;
  Duo: number = 0;
  Temp: number = 0;
  username = this._global.UserName;
  location = this._global.UserLocation;

  constructor(
    private _service: LoginService,
    private socket: Socket,
    public nav: NavController,
    public popoverCtrl: PopoverController,
    public _global: GlobalService
  ) {}

  ionViewDidLoad() {
    this.isToggled = false;
    this.socket.connect();
    var that = this;
    this.socket.on(
      JSON.parse(localStorage.getItem("userData")).homeId.toString(),
      msg => {
        that.WindowsSensors = [];
        that.DoorsSensors = [];
        for (var i in JSON.parse(msg.payload)) {
          if (i.endsWith("Window")) {
            that.WindowsSensors.push([i, JSON.parse(msg.payload)[i]]);
          } else if (i.endsWith("Door")) {
            that.DoorsSensors.push([i, JSON.parse(msg.payload)[i]]);
          }
        }

        console.log(that.WindowsSensors);

        this.Home.Alarm = JSON.parse(msg.payload).Alarm;
        if (this.refresh) {
          if (this.Home.Alarm.toString() === "0") {
            this.isToggled = false;
          } else {
            this.isToggled = true;
          }
        }
        this.Mono = JSON.parse(msg.payload).CarbonMonoxide;
        this.Duo = JSON.parse(msg.payload).CarbonDioxide;
        this.Temp = JSON.parse(msg.payload).Temp;
        console.log(msg);
      }
    );
    var that = this;
    setInterval(function() {
      //console.log(JSON.parse(localStorage.getItem("userData")).refreshToken.toString());
      //console.log(JSON.parse(localStorage.getItem("userData")).RefreshToken)
      if (localStorage.getItem("userData")) {
        that._service.RefreshToken().subscribe(d => {});
      }
    }, 7000);
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
  addUser() {
    this.nav.push(AddUserPage);
  }

  public notify() {
    this.refresh = false;

    let a: string =
      JSON.parse(localStorage.getItem("userData")).homeId.toString() + "_alarm";

    this._service
      .PostAlarm(
        { NewValue: Number(this.isToggled).toString(), change: a },
        JSON.parse(localStorage.getItem("userData")).accessToken
      )
      .subscribe(d => {});
    var that = this;
    setTimeout(function() {
      that.refresh = true;
    }, 2000);
  }
  goToDoors() {
    //this.nav.push(DoorsPage, { DoorsSensors: this.DoorsSensors });
    this.nav.push(DoorsPage);
  }
  goToWindows() {
    this.nav.push(WindowsPage, { WindowsSensors: this.WindowsSensors });
  }
}

/* public notify() {
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
 */
