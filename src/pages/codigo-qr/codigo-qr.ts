import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { HomePage } from './../home/home';
import { GlobalService } from './../../services/global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-codigo-qr',
  templateUrl: 'codigo-qr.html',
})
export class CodigoQrPage {
  QR = this._global.tempQRGuid;
  visitorName = this._global.tempVisitorName;
  visitorDate = this._global.tempVisitorDate;
  visitorInitialDate = this._global.tempVisitorInitialDate;
  visitorFinalDate = this._global.tempVisitorFinalDate;
  visitaUnica = this._global.tempVisitorDate != '' ? true : false;
  tempQRCode = this._global.tempQRGuid;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _global:GlobalService, private screenshot:Screenshot, private socialsharing:SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodigoQrPage'); 
  }

  regresar(){
    this._global.tempQRGuid = null;      
    this._global.tempVisitorName = null;
    this._global.tempVisitorDate = null; 

    this.navCtrl.setRoot(HomePage);

  }
/* 
  compartirWa(){            
      this.screenshot.URI(80)
        .then((res) => {
          this.socialsharing.shareViaWhatsApp(null, res.URI, null)
           .then(() => {},
             () => { 
               alert('SocialSharing failed');
             });
           },
          () => {
          alert('Screenshot failed');
          });        
  }

  compartirFb(){            
    this.screenshot.URI(80)
      .then((res) => {
        this.socialsharing.shareViaFacebook(null, res.URI, null)
         .then(() => {},
           () => { 
             alert('SocialSharing failed');
           });
         },
        () => {
        alert('Screenshot failed');
        });        
} */

compartirGen(){            
  this.screenshot.URI(80).then(res => {
    this.socialsharing.share("Share message", "Share subject", res.URI, "A URL to share").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }).catch(() => {
    console.error("screenshot: failed");
  });
}

}
