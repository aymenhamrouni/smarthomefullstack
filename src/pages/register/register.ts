import { LoginPage } from "./../login/login";
import { LoginService } from "./../../services/login";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { NavController, AlertController, ToastController } from "ionic-angular";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  pageTitle = "Registration";
  errorMsj: string;
  user: any = {};
  registerForm: any = {};
  r: boolean;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public toastCrtl: ToastController,
    private _service: LoginService
  ) {
    this.registerForm = new FormGroup({
      homeId: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      email: new FormControl( 
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5)
        ])
      )
    });
  }

  // register and go to home page
  register() {
    
    if (this.ValidateUser()==="allclear") {
      this._service.RegisterUser(this.user).subscribe(d => {
        this.r = this.confirmResponse(d);
        if (this.r) {
          this.nav.setRoot(LoginPage);
        }
      });
    } else {

      console.log("aaa");
      this.useToast(
        this.ValidateUser(),
        5000
      );
    }
  }

  ValidateUser() {
    if (this.registerForm.controls.homeId.invalid) return "Home Code is Invalid!";
    else if(this.registerForm.controls.address.invalid) return "Address is Invalid!";
    else if(this.registerForm.controls.userName.invalid) return "Username is Invalid!";
    else if(this.registerForm.controls.email.invalid) return "Email is Invalid!";
    else if(this.registerForm.controls.password.invalid) return "Password is Invalid!";
    else {
      this.user = {
        userName: this.registerForm.controls.userName.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
        address: this.registerForm.controls.address.value,
        homeId : this.registerForm.controls.homeId.value
      };

      return "allclear";
    }
  }

  login() {
    this.nav.setRoot(LoginPage, { willingly: true });
  }

  useToast(msg, time) {
    let toast = this.toastCrtl.create({
      message: msg,
      duration: time,
      position: "top",
      cssClass: "dark-trans",
      closeButtonText: "OK",
      showCloseButton: true
    });
    toast.present();
  }
  confirmResponse(data) {
    if (data.id) {
      this.useToast("Register was successfull", 5000);
      localStorage.setItem("UserId",data);
      return true;
    } else {
      this.useToast(data.err, 5000);
      return false;
    }
  }
}
