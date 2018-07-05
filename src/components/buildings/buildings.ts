import { Component } from '@angular/core';



/**
 * Generated class for the BuildingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'buildings',
  templateUrl: 'buildings.html'
})
export class BuildingsComponent {

  text: string;

  constructor() {
    console.log('Hello BuildingsComponent Component');
    this.text = 'Hello World';
  }


}
