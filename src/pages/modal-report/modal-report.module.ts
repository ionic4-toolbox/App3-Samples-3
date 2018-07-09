import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalReportPage } from './modal-report';

@NgModule({
  declarations: [
    ModalReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalReportPage),
  ],
})
export class ModalReportPageModule {}
