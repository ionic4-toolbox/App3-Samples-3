import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProfessorPage } from './modal-professor';

@NgModule({
  declarations: [
    ModalProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProfessorPage),
  ],
})
export class ModalProfessorPageModule {}
