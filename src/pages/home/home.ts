import { Component } from '@angular/core';
import { NavController,ModalController,ModalOptions,ViewController } from 'ionic-angular';
import {ModalDirectoryLocationPage} from "../modal-directory-location/modal-directory-location";
import {ModalProfessorPage} from '../modal-professor/modal-professor'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  isOpenModal:any;
  constructor(public navCtrl: NavController,private modal:ModalController, private view: ViewController) {
    this.isOpenModal = 0;
  }

  // sendData(){
  //
  //   this.nodeService.findBuilding("Citi","","");
  //   //this.geolocation.directoryRequest('Properties','Servicios','Institutos y escuelas técnicas superiores','','','','','','','','');
  //
  // }

  Directory(){

  }

  openModal(){
   const myModalOptions: ModalOptions = {
      enableBackdropDismiss:false,
      showBackdrop:true
    
    };
    const directoryModal = this.modal.create('ModalDirectoryLocationPage',null,myModalOptions);

    directoryModal.present();
  }

  openModalProfessor(){
    let modalq = this.modal.create(ModalProfessorPage);
    modalq.present();

  }
  closePopupInfo(){
    document.getElementById('divInfoPopupId').style.display = 'none';
  }

}
