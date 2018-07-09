import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,ViewController } from 'ionic-angular';
import {ModalRoutePage} from '../modal-route/modal-route';
import {ModalDirectoryDistanceModePage} from '../modal-directory-distance-mode/modal-directory-distance-mode'
import {ModalDirectoryProximityModePage} from '../modal-directory-proximity-mode/modal-directory-proximity-mode'
import {ModalProfessorPage} from '../modal-professor/modal-professor'

/**
 * Generated class for the ModalReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-report',
  templateUrl: 'modal-report.html',
})
export class ModalReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private modal:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalReportPage');
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
  openModalDirectoryProximityMode(){
    let modalq = this.modal.create(ModalDirectoryProximityModePage);
    modalq.present();
    this.view.dismiss();
  }

  openModalProfessor(){
    let modalq = this.modal.create(ModalProfessorPage);
    modalq.present();
    this.view.dismiss();
  }

  openProfessorPage(){
    this.navCtrl.push(ModalProfessorPage);
  }


  closeModal(){
    this.view.dismiss();
  }
}
