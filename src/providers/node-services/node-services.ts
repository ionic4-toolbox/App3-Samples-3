import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map'

/*
  Generated class for the NodeServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NodeServicesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NodeServicesProvider Provider');
  }

   findBuilding(name,facultyName,studyLineName){

    let data = JSON.stringify({
      name: name,
      facultyName: facultyName,
      studyLineName: studyLineName
     });
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/BuildingsFind',data,{headers}).map(res=>res).subscribe(data=>{
        console.log(data);
      });



  }

  getAreas(name,type){
    let data = JSON.stringify({
      name: name,
      type: type,

    });
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/AreasFind',data,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });
  }

  getInteresPlaces(name,type){
    let data = JSON.stringify({
      name: name,
      type: type,

    });
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/InterestPlacesFind',data,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });
  }

  buildingList(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/BuildingsList',null,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

  areasList(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/AreasList',null,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

  interestPlacesList(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/InterestPlacesList',null,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

  facultyList(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/FacultyList',null,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

  studyLineList(){

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.http.post('http://localhost:8888/StudyLineList',null,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }


}
