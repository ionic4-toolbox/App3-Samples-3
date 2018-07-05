import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,ViewController } from 'ionic-angular';
import {ModalRoutePage} from '../modal-route/modal-route';
import {ModalDirectoryDistanceModePage} from '../modal-directory-distance-mode/modal-directory-distance-mode'
import {ModalDirectoryLocationPage} from '../modal-directory-location/modal-directory-location'

/**
 * Generated class for the ModalDirectoryProximityModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-directory-proximity-mode',
  templateUrl: 'modal-directory-proximity-mode.html',
})
export class ModalDirectoryProximityModePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private view:ViewController,private modal:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDirectoryProximityModePage');
  }

  openModalRoute(){
    let modalq = this.modal.create(ModalRoutePage);
    modalq.present();
    this.view.dismiss();
  }
  openModalDirectoryDistanceMode(){
    let modalq = this.modal.create(ModalDirectoryDistanceModePage);
    modalq.present();
    this.view.dismiss();
  }
  openModalDirectory(){
    let modalq = this.modal.create(ModalDirectoryLocationPage);
    modalq.present();
    this.view.dismiss();
  }

  showCoordinate(){
    document.getElementById('coordinateLabel').style.display = 'block';
    document.getElementById('moreClose').style.display = 'none';
  }
  showClose(){
    document.getElementById('moreClose').style.display = 'block';
    document.getElementById('coordinateLabel').style.display = 'none';
  }
  closeModal(){
    this.view.dismiss();
  }

}
