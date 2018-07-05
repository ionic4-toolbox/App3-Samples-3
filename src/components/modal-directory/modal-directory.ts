import { Component } from '@angular/core';

/**
 * Generated class for the ModalDirectoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-directory',
  templateUrl: 'modal-directory.html'
})
export class ModalDirectoryComponent {

  text: string;

  constructor() {
    console.log('Hello ModalDirectoryComponent Component');
    this.text = 'Hello World';
  }

}
