import { GlobalService } from "./../../services/global";
import { LoginService } from "./../../services/login";
import { Component } from "@angular/core";
import {
  NavParams,
  NavController,
  AlertController,
  ToastController,
  MenuController,
  LoadingController
} from "ionic-angular";

import { RegisterPage } from "../register/register";
import { HomePage } from "./../home/home";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loader: any;
  pageTitle = "Login";
  errorMsj: string;
  user: any = {};
  r: boolean;
  validToken: String;
  constructor(
    public navParams: NavParams,
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public _service: LoginService,
    public _global: GlobalService
  ) {
    this._global.UserEmail = null;
    this._global.UserName = null;
    this._global.UserLocation = null;
    this.menu.swipeEnable(false);
    console.log(navParams.get("willingly"));

    var that = this;
    if (localStorage.getItem("userData")) {
      this._service.CheckUser().subscribe(result => {
        console.log("result = ", result.ValidJWT);
        that.validToken = result.ValidJWT;
        if (localStorage.getItem("userData") && that.validToken === "True") {
          that.nav.setRoot(HomePage);
        } else if (
          !localStorage.getItem("UserId") &&
          !navParams.get("willingly")
        ) {
          that.nav.setRoot(RegisterPage);
        }
      });
    }
    /* setTimeout(function(){
    
  },500); */
  }
  ionViewDidLoad() {}

  loadingCreate() {
    this.loader = this.loading.create({
      content: "Loading..."
      //duration : 1500
    });
    return this.loader.present();
  }
  onSubmit() {
    this.loadingCreate().then(() => {
      this.validateUser();
    });
  }

  validateUser() {
    this._service.ValidateUser(this.user).subscribe(d => {
      console.log("this is d");
      console.log(d);
      this.r = this.confirmResponse(d);
      if (this.r) {
        console.log("r value: " + this.r);
        this._global.UserEmail = d[1];
        this._global.UserName = d[2];
        this._global.UserLocation = d[3];

        this.loader.dismiss();
        localStorage.setItem("userData", JSON.stringify(d));
        this.nav.setRoot(HomePage);
      } else {
        this.loader.dismiss();
        this.useToast(
          "Your Credentials are incorrect ,Please verify it !",
          5000
        );
      }
    });
  }

  confirmResponse(data) {
    if (data.accessToken) {
      return true;
    } else {
      return false;
    }
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: "Olvido su contraseña?",
      message: "Ingrese su email para recordarle sus credenciales de addUser.",
      inputs: [
        {
          name: "email",
          placeholder: "Email",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enviar",
          handler: data => {
            console.log("Send clicked");
            this.mandarCorreo(data);
          }
        }
      ]
    });
    forgot.present();
  }

  mandarCorreo(data) {
    this._service.RecoverPassword(data).subscribe(d => {
      if (d != undefined) {
        this.useToast(
          "Se ha enviado un correo a la dirección indicada con sus credenciales. Favor de verificar.",
          3000
        );
      }
    });
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
