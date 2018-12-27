import { GlobalService } from './../../services/global';
import { VisitService } from './../../services/visit';
import { CodigoQrPage } from './../codigo-qr/codigo-qr';
import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-acceso',
  templateUrl: 'acceso.html',
})

export class AccesoPage {
  pageTitle = "Acceso";
  errorMsj:string;
  visit:any={};
  r:boolean;

  accesoForm:any={};
  recurrente:boolean = false;

  username = this._global.UserName;
  useremail = this._global.UserEmail;
  location = this._global.UserLocation;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private _service: VisitService, public _global:GlobalService) {
    
    this.accesoForm = new FormGroup({           
      name: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(200),
      ])),
      car: new FormControl('',Validators.compose([
        Validators.maxLength(100),
      ])),
      plates: new FormControl('',Validators.compose([
        Validators.maxLength(10),
      ])),
      type: new FormControl('',Validators.required),
      notes: new FormControl('', Validators.maxLength(100)),
      visitDate: new FormControl(''),
      initialDate: new FormControl(''),
      expirationDate: new FormControl('')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccesoPage');
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  configuraFechas(tipo){
    if(tipo == 1)
      this.recurrente = false;
    if(tipo == 2)
      this.recurrente = true;
            
  }

  CrearVisita(){
    if(this.Validate()){      
      this._service.CreateVisit(this.visit).subscribe(
        d => {
          this.r = this.confirmResponse(d);
          if (this.r) {
            this._global.tempQRGuid = d.qrGuid;      
            this._global.tempVisitorName = d.name;
            
            if(d.type == '1'){
              this._global.tempVisitorDate = this.formatDate(d.visitDate);
              this._global.tempVisitorInitialDate = '';
              this._global.tempVisitorFinalDate = '';
            } else {
              this._global.tempVisitorDate = '';
              this._global.tempVisitorInitialDate = this.formatDate(d.initialDate);
              this._global.tempVisitorFinalDate = this.formatDate(d.expirationDate);   
            }
            
            this.nav.setRoot(CodigoQrPage);
          }
        });
    }      
    else{
      this.useToast('Favor de capturar los campos requeridos marcados con *',3000);
    }
  }

  Validate() {    
    console.log(this.accesoForm.invalid);

    if(this.accesoForm.invalid)
      return false;
    else {
      if (this.accesoForm.controls.type.value == '1' && this.accesoForm.controls.visitDate.value == ''){
        this.useToast('Favor de capturar la fecha de la visita.',3000);
        return false;
      } else if (this.accesoForm.controls.type.value == '2') {

        if (this.accesoForm.controls.initialDate.value == '' || this.accesoForm.controls.expirationDate.value == ''){
          this.useToast('Favor de capturar ambas fechas del periodo de la visita.',3000);
          return false;
        }

        var FechaInicio = new Date(this.accesoForm.controls.initialDate.value);
        var FechaFin = new Date(this.accesoForm.controls.expirationDate.value);

        if (FechaInicio > FechaFin){
          this.useToast('La fecha de inicio no puede ser mayor que la fecha de término.',3000);
          return false;
        } else {
          this.configuraObjetoVisita();
          return true;       
        }      
      } else {
        this.configuraObjetoVisita();
        return true;       
      }      
    }
  }

  configuraObjetoVisita(){
    this.visit = {
      Id: 0,
      QRGuid: '',
      UserEmail: this._global.UserEmail,
      UserAddress: this._global.UserLocation,
      Name: this.accesoForm.controls.name.value,
      Car: this.accesoForm.controls.car.value,
      Plates: this.accesoForm.controls.plates.value,
      Notes: this.accesoForm.controls.notes.value,
      Type: this.accesoForm.controls.type.value,
      VisitDate: this.accesoForm.controls.visitDate.value != '' ? this.accesoForm.controls.visitDate.value : '2000-01-01',
      InitialDate: this.accesoForm.controls.initialDate.value != '' ? this.accesoForm.controls.initialDate.value : '2000-01-01',
      ExpirationDate: this.accesoForm.controls.expirationDate.value != '' ? this.accesoForm.controls.expirationDate.value : '2000-01-01'          
    }
  }

  useToast(msg, time){
    let toast = this.toastCtrl.create({
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
    if(data.qrGuid != '') {
      this.useToast('¡Registro creado correctamente!',5000); 
      return true;
    }
    else{      
      this.useToast('Ocurrio un error. Favor de intentar de nuevo',3000);
      return false;
    }
  }

  acortaFecha(str){
    str = str.substring(0, str.indexOf('T')-1);
    return str;
  }

  formatDate(f) {
    var date = new Date(f);

    var monthNames = [
      "Ene", "Feb", "Mar",
      "Abr", "May", "Jun", "Jul",
      "Ago", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}