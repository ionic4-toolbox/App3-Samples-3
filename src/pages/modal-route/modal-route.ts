import { Component } from '@angular/core';
import { IonicPage,ModalController,ModalOptions, NavController, NavParams, ViewController } from 'ionic-angular';
import {ModalDirectoryLocationPage} from '../modal-directory-location/modal-directory-location'
import {ModalDirectoryDistanceModePage} from '../modal-directory-distance-mode/modal-directory-distance-mode'
import {ModalDirectoryProximityModePage} from '../modal-directory-proximity-mode/modal-directory-proximity-mode'

/**
 * Generated class for the ModalRoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-route',
  templateUrl: 'modal-route.html',
})
export class ModalRoutePage {

 
  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController
  ,private modal:ModalController) {
  }

  ionViewDidLoad() {
     
  }

  closeModal(){
    this.view.dismiss();
  }

  openModalDirectory(){
    let modalq = this.modal.create(ModalDirectoryLocationPage);
    modalq.present();
    this.view.dismiss();
  }

  openModalDirectoryDistanceMode(){
    let modalq = this.modal.create(ModalDirectoryDistanceModePage);
    modalq.present();
    this.view.dismiss();
  }
  openModalDirectoryProximityMode(){
    let modalq = this.modal.create(ModalDirectoryProximityModePage);
    modalq.present();
    this.view.dismiss();
  }

}
