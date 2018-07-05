import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfessorsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfessorsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProfessorsServiceProvider Provider');

  }

  // getProfessors(){
  //   this.http.get('http://10.8.1.8:8083/ProfessorService.asmx?WSDL',);
  // }

}
