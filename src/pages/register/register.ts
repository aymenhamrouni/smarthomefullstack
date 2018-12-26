import { LoginPage } from './../login/login';
import { LoginService } from './../../services/login';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component} from "@angular/core";
import { NavController, AlertController, ToastController } from "ionic-angular";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  pageTitle = 'Registration';
  errorMsj:string;
  user:any={};
  registerForm:any={};
  r:boolean;

  constructor(public nav: NavController,
              public forgotCtrl: AlertController,
              public toastCrtl: ToastController,
              private _service: LoginService) {

                this.registerForm = new FormGroup({
                  codigo: new FormControl('',Validators.required),
                  name: new FormControl('',Validators.required),
                  address: new FormControl('',Validators.required),
                  email: new FormControl('',Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])),
                  password: new FormControl('',Validators.compose([
                    Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(5),
                  ])),
                });
  }

  // register and go to home page
  register() {
    
    if(this.ValidateUser()){
      this._service.RegisterUser(this.user).subscribe(
        d => {
          this.r = this.confirmResponse(d);
          if (this.r) {
            this.nav.setRoot(LoginPage);
          }
        });
    } else {
      this.useToast("Favor de validar y capturar todos los campos requeridos",5000)
    }

  }
  
  ValidateUser() {    
    console.log(this.registerForm.invalid);

    if(this.registerForm.invalid)
      return false;
    else {
      this.user = {
        Name: this.registerForm.controls.name.value,
        Email: this.registerForm.controls.email.value,
        Password: this.registerForm.controls.password.value,
        Address: this.registerForm.controls.address.value,
        ActivationKey: this.registerForm.controls.codigo.value
      }

      return true;
    }
  }
  
  login() {
    this.nav.setRoot(LoginPage);
  }

  useToast(msg, time){
    let toast = this.toastCrtl.create({
      message: msg,
      duration: time,
      position: 'top',
      cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }
  confirmResponse(data) {
    console.log('server response:' + data);
    if(data[1] == 'ok') {
      this.useToast('¡Registro creado correctamente!',5000); 
      return true;
    }
    else{      
      this.useToast(data[0],5000);
      return false;
    }
  }
}