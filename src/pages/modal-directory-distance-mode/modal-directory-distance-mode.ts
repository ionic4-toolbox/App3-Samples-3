import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {ModalRoutePage} from '../modal-route/modal-route';
import {ModalDirectoryLocationPage} from '../modal-directory-location/modal-directory-location'
import{ModalDirectoryProximityModePage} from '../modal-directory-proximity-mode/modal-directory-proximity-mode'
/**
 * Generated class for the ModalDirectoryDistanceModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-directory-distance-mode',
  templateUrl: 'modal-directory-distance-mode.html',
})
export class ModalDirectoryDistanceModePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private modal:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDirectoryDistanceModePage');
  }

  openModalRoute(){
    let modalq = this.modal.create(ModalRoutePage);
    modalq.present();
    this.view.dismiss();
  }
  openModalDirectoryProximityMode(){
    let modalq = this.modal.create(ModalDirectoryProximityModePage);
    modalq.present();
    this.view.dismiss();
  }
  openModalDirectory(){
    let modalq = this.modal.create(ModalDirectoryLocationPage);
    modalq.present();
    this.view.dismiss();
  }


  closeModal(){
    this.view.dismiss();
  }

}
