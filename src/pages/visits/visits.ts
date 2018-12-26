import { CodigoQrPage } from './../codigo-qr/codigo-qr';
import { GlobalService } from './../../services/global';
import { VisitService } from './../../services/visit';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the VisitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visits',
  templateUrl: 'visits.html',
})
export class VisitsPage {

  items:any=[];
  userEmail = this._global.UserEmail;

  constructor(public nav: NavController, public navParams: NavParams, private _service:VisitService, public _global:GlobalService, public toastCtrl:ToastController) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    if(this.userEmail != null || this.userEmail != ''){     
      this._service.GetVisits(this.userEmail).subscribe(
        d => {
          this.items = d;
      });
    } else {
      this.useToast('No se encontraron registros',1500);
    }
  }

  itemSelected(d){
    console.log(d);
    var QR = d.qrGuid;

    if(QR.length > 0){

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
    else{
      this.useToast('Ocurrio un error al leer el detalle de la visita, favor de intentar nuevamente',1500);
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
