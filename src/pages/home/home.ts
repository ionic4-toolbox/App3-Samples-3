import {Component, ViewChild} from '@angular/core';
import {Content, LoadingController} from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

import { AddEventPage } from '../add-event/add-event';

import {DatabaseProvider} from "../../providers/database/database";



import { ScrollService } from 'angular2-viewport';
import * as $ from "jquery";
import {TabPage} from "../tab/tab";
import {style} from "@angular/core/src/animation/dsl";

import { DatePicker } from '@ionic-native/date-picker';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content)
  content:Content;

  date: any;
  daysInThisMonth: any;
  monthNames: string[];
  weekDayNames: any;
  weekDayNamesDefault: string[];
  currentMonth: any;
  currentYear: any;
  eventList: any;
  todayToAdd: any
  lessAt: any;
  addAt:any;
  endDate: any;
  startDate: any;
  canLess: boolean;
  dateToRepositionView: any;
  dateToReloadViewStart: any;
  dateToReloadViewEnd: any;
  reloadView: boolean;
  asd: boolean;


  developers = [];
  developer = {};

  loaded:   boolean = false;
  cant: number;

  today: any;
  endweek: any;
  srtarweek: any;

  array = [];
  sum = 1000;
  //Inicio para cargar lista de tuplas de tabla reservation
  reserva = {};
  reservas = [];
  estados: any;
  //Fin para cargar lista de tuplas de tabla reservation
  rooms: any;
  static from_date;
  static to_date;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private calendar: Calendar,
              private databaseProvider: DatabaseProvider,
              public scrollService: ScrollService,
              public loadingCtrl: LoadingController,
              private datePicker: DatePicker
                                 ) {
    scrollService.onScroll.subscribe(e => {

        // Para una de las formas

    });
    var options = {
      date: new Date(),
      mode: 'date'
    };

    function onSuccess(date) {
      alert('Selected date: ' + date);
    }

    function onError(error) { // Android only
      alert('Error: ' + error);
    }


    this.canLess = false;
    this.asd = true;
    this.date = new Date();
    this.today =this.date.getDate()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
    //Saber cuando tengo que añadir mas o menos
    this.todayToAdd = this.date;
    this.lessAt = new Date(this.date.getTime()+1000*60*60*24*2);
    this.startDate = new Date(this.date.getTime()-1000*60*60*24*1);
    this.addAt = new Date(this.date.getTime()+1000*60*60*24*60);
    this.reloadView = false;

    this.monthNames = ["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agos.","Sept","Octu.","Novie.","Dicie."];
    this.weekDayNames = ["Lu","Ma","Mi", "Ju","Vi","Sa","Do"];
    this.weekDayNamesDefault = ["DO","LU","MA","MI", "JU","VI","SÁ"];

    this.eventList = new Array();


    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if(rdy){

        this.getAllRooms();
        this.loadReservationData();
      }
    });


  this.daysInThisMonth = new Array();
  this.weekDayNames = new Array();

  this.cant = 75;

    this.dateToReloadViewStart =  new Date(this.date.getTime()-1000*60*60*24*70);
    this.dateToReloadViewEnd =  new Date(this.date.getTime()+1000*60*60*24*70);

  //Add days at start
    for (let i = this.cant; i > 0; i--){
      let fecha = new Date();
      let f = new Date(fecha.setDate(fecha.getDate() - i));
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    //Add days at end
    for (let i = 0; i < this.cant ; i++){
      let fecha = new Date();
      let f = new Date(fecha.setDate(fecha.getDate() + i));
      this.endDate = f;
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }



  }


  loadReservationData(){
   this.databaseProvider.getAllReservation().then(data => {
      this.reservas = data;
      for(let reserva of this.reservas){
        this.initPaint(reserva.from_date,reserva.to_date, reserva.status);
      }
    });
  }

  loadStatusData(){
    this.databaseProvider.getAllStatus().then(data => {
      this.estados = data;
    });
  }


  addEvent() {
    let day =  this.tranformarFecha(this.date);
    this.navCtrl.push(TabPage, {'from_date':day});
  }



  /*swipe(event) {
    if(event.direction === 2) {
        this.goToNextMonth()
    }
    if(event.direction === 4) {
        this.goToLastMonth()
    }
  }*/



  addAtStart(){

   let firstDate = this.daysInThisMonth[0];
   firstDate =  new Date(firstDate.getTime()-1000*60*60*24*60)
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 240 ; i++){
      let fecha = firstDate;
      let f = new Date(fecha.getTime() + 1000*60*60*24*i);
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+1000*60*60*24*20);
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-1000*60*60*24*20);

    console.log(this.dateToReloadViewStart)

  }
  addAtEnd(){

    let calc = 1000*60*60*24;
   let lastDate = this.daysInThisMonth[this.daysInThisMonth.length-1];
       lastDate =  new Date(lastDate.getTime()-calc*60);
    this.daysInThisMonth = new Array();
    this.weekDayNames = new Array();

    for (let i = 1; i < 240 ; i++){
      let fecha = lastDate;
      let f = new Date(fecha.getTime() + calc*i);
      this.daysInThisMonth.push(f);
      this.weekDayNames.push(this.weekDayNamesDefault[f.getDay()]);
    }
    this.dateToReloadViewEnd =  new Date(this.daysInThisMonth[this.daysInThisMonth.length-1].getTime()-calc*20);
    this.dateToReloadViewStart =  new Date(this.daysInThisMonth[0].getTime()+calc*20);
    console.log(this.dateToReloadViewEnd)

  }

  addmore(day){
    this.currentMonth = this.monthNames[day.getMonth()];
    this.currentYear = day.getFullYear();
    console.log(day)
    /*   console.log(day.getMonth())*/

    if(day <= this.dateToReloadViewStart && !this.reloadView){
      this.presentLoadingDefault();
      this.asd = false;
      this.addAtStart();
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.reloadView = true;
      this.loadReservationData()
    }

    if(day >= this.dateToReloadViewEnd && !this.reloadView){
      this.presentLoadingDefault();
      this.asd = false;
      this.dateToRepositionView =new Date(day.getTime()+1000*60*60*24*2);
      this.addAtEnd();
      this.reloadView = true;
      this.loadReservationData()
    }
  }

  crear_evento(day){
     HomePage.from_date = this.tranformarFecha(day);
     HomePage.to_date = this.tranformarFechaAStringEnd(day);
    this.navCtrl.push(TabPage);

  }

  static pintar(startDate,endDate,status){//OFIR NO BORRES ESTA FUNCION!!!!

    // let start = startDate.getFullYear()+"-"+startDate.getMonth()+"-"+startDate.getDay();
    // let end = endDate.getFullYear()+"-"+endDate.getMonth()+"-"+endDate.getDay();

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let currentDay;
    let idCurrentDay;

    if( $("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin') ){

      $("#hab1-" + idStart).addClass('dos-reservas-inicio');

    }
    if( $("#hab1-" + idEnd).hasClass('triangulo-equilatero-bottom-inicio') ){

      $("#hab1-" + idEnd).addClass('dos-reservas-fin');

    }

    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));




    for(let i = 0; i < cantDias+1;i++){
      if( i == 0 && !($("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin')) ){
        // alert("Start Day:"+startDate);
        $("#hab1-" + idStart).addClass('triangulo-equilatero-bottom-inicio-'+status);
      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        $("#hab1-" + idEnd).addClass('triangulo-equilatero-bottom-fin-'+status);
      }
      if( i != 0 && i != cantDias){
        // alert("i:"+i);
        // let currentDay = start.getFullYear()+"-"+(end.getMonth())+"-"+(start.getDate()+i);
        currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        // alert(currentDay);
        $("#hab1-" + idCurrentDay).addClass('cuadrado-'+status);
      }
    }

    // $("#hab1-" + start.toLocaleDateString()).addClass('triangulo-equilatero-bottom-inicio');
    // $("#hab1-" + (i+1)).addClass('cuadrado');
    // $("#hab1-" + (i+2)).addClass('triangulo-equilatero-bottom-fin');
    // this.loadReservationData();

  }

  initPaint(startDate,endDate,status){//OFIR NO BORRES ESTA FUNCION!!!!
    // let start = startDate.getFullYear()+"-"+startDate.getMonth()+"-"+startDate.getDay();
    // let end = endDate.getFullYear()+"-"+endDate.getMonth()+"-"+endDate.getDay();

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let currentDay;
    let idCurrentDay;

    if( $("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin') ){

      $("#hab1-" + idStart).addClass('dos-reservas-inicio');

    }
    if( $("#hab1-" + idEnd).hasClass('triangulo-equilatero-bottom-inicio') ){

      $("#hab1-" + idEnd).addClass('dos-reservas-fin');

    }

    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));




    for(let i = 0; i < cantDias+1;i++){
      if( i == 0 && !($("#hab1-" + idStart).hasClass('triangulo-equilatero-bottom-fin')) ){
        // alert("Start Day:"+startDate);
        $("#hab1-" + idStart).addClass('triangulo-equilatero-bottom-inicio-'+status);
      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        $("#hab1-" + idEnd).addClass('triangulo-equilatero-bottom-fin-'+status);
      }
      if( i != 0 && i != cantDias){
        // alert("i:"+i);
        // let currentDay = start.getFullYear()+"-"+(end.getMonth())+"-"+(start.getDate()+i);
        currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        // alert(currentDay);
        $("#hab1-" + idCurrentDay).addClass('cuadrado-'+status);
      }
    }

    // $("#hab1-" + start.toLocaleDateString()).addClass('triangulo-equilatero-bottom-inicio');
    // $("#hab1-" + (i+1)).addClass('cuadrado');
    // $("#hab1-" + (i+2)).addClass('triangulo-equilatero-bottom-fin');
    // this.loadReservationData();

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando más...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 250);
  }

  ngAfterViewInit() {
    console.log('Initialized');
    let g = new Date();
    g.setDate(g.getDate() + 2);
    let id = +g.getDate() + '-' + g.getMonth() + '-' + g.getFullYear();
    // let id1 =+g.getDate()+'-'+g.getMonth()+'-'+g.getFullYear()+'1';
    document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
    //    document.getElementById(id1).scrollIntoView();
    var c: any;
    c = document.getElementById('canvas');
    var ctxs = c.getContext("2d");
// ctxs.moveTo(0, 0);
// ctxs.lineTo(20, 0);
// ctxs.lineTo(1000, 1000);
// ctxs.lineTo(0, 20);
// ctxs.moveTo(0, 0);
// ctxs.lineTo(1000, 1000);
//
// ctxs.fillStyle = "#000000";
// ctxs.fill();
//     ctxs.beginPath();
//     ctxs.moveTo(0, 0);
//     ctxs.lineTo(0,700);
//     ctxs.lineTo(700,700);
//     ctxs.fillStyle = "#996633";
//     ctxs.fill();
//
//     ctxs.beginPath();
//     ctxs.moveTo(710, 700);
//     ctxs.lineTo(710,0);
//     ctxs.lineTo(10,0);
//     ctxs.fillStyle = "#293499";
//     ctxs.fill();

    // //cuadrado
    // ctxs.beginPath();
    // ctxs.moveTo(0, 0);
    // ctxs.lineTo(0,300);
    // ctxs.lineTo(145,300);
    // ctxs.lineTo(145,0);
    // ctxs.fillStyle = "#996633";
    // ctxs.fill();
    //
    // //cuadrado

    //ofir
    var cq : any = document.getElementById("hb2-75");

    /*
    * Inicio-Fin
    * */
    var ctxsq = cq.getContext("2d");

    ctxsq.beginPath();
    ctxsq.moveTo(280, 0);
    ctxsq.lineTo(0,0);
    ctxsq.lineTo(0,145);
    ctxsq.fillStyle = "#996633";
    ctxsq.fill();

    ctxsq.beginPath();
    ctxsq.moveTo(20, 145);
    ctxsq.lineTo(300,145);
    ctxsq.lineTo(300,0);
    ctxsq.fillStyle = "#293499";

    ctxsq.fill();

    /*
       * cuadrado
       * */

    var c1 : any = document.getElementById("hb2-76");


    var ctxs1 = c1.getContext("2d");

    ctxs1.beginPath();
    ctxs1.moveTo(0, 0);
    ctxs1.lineTo(0,145);
    ctxs1.lineTo(145,145);
    ctxs1.lineTo(300,145);
    ctxs1.lineTo(300,0);
    ctxs1.fillStyle = "#293499";
    ctxs1.fill();


    /*
    * fin
    * */
    var c2 : any = document.getElementById("hb2-77");

    var ctxs2 = c2.getContext("2d");

    ctxs2.beginPath();
    ctxs2.moveTo(280, 0);
    ctxs2.lineTo(0,0);
    ctxs2.lineTo(0,145);
    ctxs2.fillStyle = "#293499";
    ctxs2.fill();

    /*
    * Inicio
    * */
    var c3 : any = document.getElementById("hb2-74");

    var ctxs3 = c3.getContext("2d");

    ctxs3.beginPath();
    ctxs3.moveTo(20, 145);
    ctxs3.lineTo(300,145);
    ctxs3.lineTo(300,0);
    ctxs3.fillStyle = "#996633";

    ctxs3.fill();

    //ofir

  }

  ngAfterViewChecked(){

    if(this.reloadView){
     // this.presentLoadingDefault();
      this.reloadView = false;
      let id =+this.dateToRepositionView.getDate()+'-'+this.dateToRepositionView.getMonth()+'-'+this.dateToRepositionView.getFullYear();
      console.log(id);
    /*  alert("id reload")
      alert(id)*/
      document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
    }
  }

  tranformarFecha(day){
   let fecha = new Date(new Date(day).getTime()).toISOString();
   let split = fecha.toString().split('T')[0];
   return split;
  }


  getAllRooms(){
    this.databaseProvider.getAllRooms().then(data => {
      this.rooms = data;
    });
  }

  tranformarFechaAStringEnd(day) {
    let fecha = new Date(new Date(day).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString();
    let split = fecha.toString().split('T')[0];
    return split;
  }



  static  pintarEvento(startDate,endDate,status){

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    let id;
   // console.log($("#hab1-" + idStart).children('canvas').attr('id'))
   //  id = $("#hab1-" + idStart).children('canvas').attr('id');
   //  HomePage.pintarTrianguloInicio(status,id);
    for(let i = 0; i < cantDias+1;i++){

      if( i == 0 ){
       id = $("#hab1-" + idStart).children('canvas').attr('id');
       HomePage.pintarTrianguloInicio(status,id);

      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
       id = $("#hab1-" + idEnd).children('canvas').attr('id');
       HomePage.pintarTrianguloFin(status,id);
      }
      if( i != 0 && i != cantDias){

        let currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        let idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        id = $("#hab1-" + idCurrentDay).children('canvas').attr('id');
        HomePage.pintarCuadrado(status,id);

      }

    }
    AddEventPage.style = 'falta_pago';
  }

  static pintarCuadrado(status,id) {

    let color = this.color(status);

    var c1 : any = document.getElementById(id);
    var ctxs1 = c1.getContext("2d");
    ctxs1.beginPath();
    ctxs1.moveTo(0, 0);
    ctxs1.lineTo(0,145);
    ctxs1.lineTo(145,145);
    ctxs1.lineTo(300,145);
    ctxs1.lineTo(300,0);
    ctxs1.fillStyle = color;
    ctxs1.fill();
  }




  static pintarTrianguloInicio(status,id){

    let color = HomePage.color(status);
    var c3 : any = document.getElementById(id);

    var ctxs3 = c3.getContext("2d");

    ctxs3.beginPath();
    ctxs3.moveTo(20, 145);
    ctxs3.lineTo(300,145);
    ctxs3.lineTo(300,0);
    ctxs3.fillStyle = color;

    ctxs3.fill();

  }

  static pintarTrianguloFin(status,id){

    let color = this.color(status);
    var c2 : any = document.getElementById(id);

    var ctxs2 = c2.getContext("2d");

    ctxs2.beginPath();
    ctxs2.moveTo(280, 0);
    ctxs2.lineTo(0,0);
    ctxs2.lineTo(0,145);
    ctxs2.fillStyle = color;
    ctxs2.fill();


  }

  static pintarDosEventosUnDia(status,id){

    let color = this.color(status);
    var c2 : any = document.getElementById("hb2-77");

    var ctxs2 = c2.getContext("2d");

    ctxs2.beginPath();
    ctxs2.moveTo(280, 0);
    ctxs2.lineTo(0,0);
    ctxs2.lineTo(0,145);
    ctxs2.fillStyle = color;
    ctxs2.fill();

  }

  static color(status){

    let color;


    if(status == "falta_pago" ){
        color = '#ff9886';
      }
    if(status == "deposito_pagado"){
        color = '#c2c33e';
      }
    if(status ==  "secondary") {
        color = '#32db64';
      }
    if(status ==  "cancelado") {
        color = '#84607f';
      }
    if(status ==  "danger"){
        color = '#f53d3d';
      }


    return color;
  }



  showDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(


    date => {
      alert(date);
      let id =+this.date.getDate()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
      alert(id);
      /*  alert("id reload")
        alert(id)*/
      document.getElementById(id).scrollIntoView(({block: "end", behavior: "instant"}));
    },
      err => console.log('Error occurred while getting date: ', err)
  );
  }

  exportDb(){
    let db = this.databaseProvider.exportAsSQL();
    alert(db);
    db.then(value => alert(value));

  }


}


