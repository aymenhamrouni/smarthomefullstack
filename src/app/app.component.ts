import { HomePage } from "./../pages/home/home";
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";

import { LoginPage } from "../pages/login/login";
import { Socket } from "ng-socket-io";
import { AddUserPage } from "../pages/addUser/addUser";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  admin: String = "0";
  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private socket: Socket,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    this.appMenuItems = [
      { title: "Home", component: HomePage, icon: "home" },
      {
        title: "Local Weather",
        component: "",
        icon: "partly-sunny"
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);
  }

  logout() {
    this.socket.disconnect();
    localStorage.removeItem("userData");

    this.nav.setRoot(LoginPage);
  }

  menuPrincipal() {
    this.nav.setRoot(HomePage);
  }

  addUser() {
    this.admin = JSON.parse(
      localStorage.getItem("userData")
    ).permissionLevel.toString();
    if (this.admin === "1073741824") {
      this.nav.push(AddUserPage);
    } else {
      this.useToast("You should be admin to add users", 2000);
    }
  }
  useToast(msg, time) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: "top",
      cssClass: "dark-trans",
      closeButtonText: "OK",
      showCloseButton: true
    });
    toast.present();
  }
}
