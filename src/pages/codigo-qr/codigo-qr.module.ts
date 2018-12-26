import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodigoQrPage } from './codigo-qr';

@NgModule({
  imports: [
    IonicPageModule.forChild(CodigoQrPage),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class CodigoQrPageModule {}
