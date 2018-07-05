import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map'

/*
  Generated class for the GeolocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GeolocationServiceProvider Provider');
  }

  directoryRequest(mode,category,type,subtype,name,phone,requestNumber,latitud,longitud,long,other){

    let data = JSON.stringify({
      mode :mode,
       category:category,
       type:type,
       subType:subtype,
       name:name,
       phone:phone,
       requestNumber:requestNumber,
       latitud:latitud,
       longitud:longitud,
       long:long,
       other:other
    });

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');

    this.http.post('http://localhost:8888/Directory',data,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

  routeRequest(iniX,iniY,finX,finY,route,intRoute,middle){

    let data = JSON.stringify({
        iniX : iniX,
        iniY : iniY ,
        finX : finX,
        finY : finY,
        route : route,
        intRoute : intRoute,
        middle :middle

    });

    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');

    this.http.post('http://localhost:8888/Directory',data,{headers}).map(res=>res).subscribe(data=>{
      console.log(data);
    });

  }

}
