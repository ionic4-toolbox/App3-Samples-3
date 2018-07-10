import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ProfessorListPage} from '../professor-list/professor-list'

/**
 * Generated class for the ModalProfessorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-professor',
  templateUrl: 'modal-professor.html',
})
export class ModalProfessorPage {
  items = [];
  titles = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.items = [
      {
        'title': 'Angular',
        'icon':  'angular',
        'description': 'A powerful Javascript framework for building single page apps. Angular is open source...',
        'color': "#E63135"
      },
      {
        'title': 'CSS3',
        'icon':  'css3',
        'description': 'The latest version of cscading stylesheets - the styling language of the web!',
        'color': "#0CA9EA"
      },
      {
        'title': 'HTML5',
        'icon':  'html5',
        'description': 'The latest version of the web\' markup language.s',
        'color': "#F46529"
      },
      {
        'title': 'JavaScript',
        'icon':  'javascript',
        'description': 'One of the most popular programming languages on the web!',
        'color': "#FFD439"
      },
      {
        'title': 'Sass',
        'icon':  'sass',
        'description': 'Syntactically awsome stylesheets..',
        'color': "#CE6296"
      },
      {
        'title': 'NodeJS',
        'icon':  'nodejs',
        'description': 'A powerful Javascript framework for building single page apps. Angular is open source...',
        'color': "#78BD43"
      }]
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProfessorPage');
  }
  openProfessorList(){
    this.navCtrl.push(ProfessorListPage);
    this.viewCtrl.dismiss();
  }


}
