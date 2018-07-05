import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRoutePage } from './modal-route';

@NgModule({
  declarations: [
    ModalRoutePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalRoutePage),
  ],
})
export class ModalRoutePageModule {}
