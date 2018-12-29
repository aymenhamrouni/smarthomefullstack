import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Socket } from "ng-socket-io";
import { ThrowStmt } from "@angular/compiler";
import { LoginService } from "../../services/login";
import { numberFormat } from "highcharts";

/**
 * Generated class for the DoorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doors",
  templateUrl: "doors.html"
})
export class DoorsPage {
  refresh: boolean = true;
  DoorsSensors = [];
  isToggled: boolean;
  constructor(
    public navCtrl: NavController,
    public socket: Socket,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public _service: LoginService
  ) {
    this.isToggled = true;
    //this.DoorsSensors = navParams.get("DoorsSensors");
    this.socket.connect();
    var that = this;
    this.socket.on(
      JSON.parse(localStorage.getItem("userData")).homeId.toString(),
      msg => {
        if (this.refresh) {
          var DoorsSensors = [];
          var position = 0;
        }
        for (var i in JSON.parse(msg.payload)) {
          if (i.endsWith("Door")) {
            if (this.refresh) {
              DoorsSensors.push([
                i,
                JSON.parse(msg.payload)[i],
                JSON.parse(msg.payload)[i] == 0,
                position
              ]);
            }
            position++;
          }
        }
        this.DoorsSensors = DoorsSensors;
        console.log(this.DoorsSensors);
      }
    );

    if (this.DoorsSensors.length == 0) {
      let loading = this.loadingCtrl.create({
        spinner: "ios",
        content: "Please wait..."
      });
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 5000);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoorsPage");
  }
  changeDoor(door, value, position) {
    console.log("aaaaaaaaaaaaaaaa", this.DoorsSensors[position]);
    this.DoorsSensors[position] = [door, !value, value == 1, position];

    this.refresh = false;
    console.log("door: ", door);
    console.log("value", event);
    let a: string =
      JSON.parse(localStorage.getItem("userData")).homeId.toString() +
      "_" +
      door.toString();
    console.log("changedoor");
    this._service
      .PostDoor(
        { NewValue: Number(!value).toString(), change: a },
        JSON.parse(localStorage.getItem("userData")).accessToken
      )
      .subscribe(d => {});
    var that = this;
    setTimeout(function() {
      that.refresh = true;
    }, 2000);
  }
}
