import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import {HomePage} from "../home/home";

import * as $ from "jquery";
import {getLocaleDateFormat, Time} from "@angular/common";

// import {DatabaseProvider} from "../../providers/database/database";
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  developers = [];
  developer = {};

  startDate;
  event = { /*title: "", message: "",*/ startDate: this.startDate, endDate: "", status: "falta_pago",  location: "", countChild: "", countAdult: ""};
  rooms= {location:"Habitacion 1"};
  selectOptions;
  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar,



              /*,private databaseProvider: DatabaseProvider*/)
  {

    this.event.startDate = navParams.get('startDate');
  //   this.databaseProvider.getDatabaseState().subscribe(rdy => {
  //   if(rdy){
  //     this.loadDeveloperData();
  //   }
  // });

    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo

      mode: 'md'
    };
    // if(navParams.data != null){
    // this.startDate = navParams.data.startDate;
    // $('#startDate').set(this.startDate);
    // }
  //Llenar rooms desde la bd
  }

  // loadDeveloperData(){
  //   this.databaseProvider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //   });
  // }
  // addDeveloper(){
  //   this.databaseProvider.addDevelopers(this.developer['name'], this.developer['skill'],this.developer['yearOfExperience'])
  //     .then(data =>{
  //       this.loadDeveloperData();
  //     });
  //   this.developer = {};
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  // save() {
  //   this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
  //     (msg) => {
  //       let alert = this.alertCtrl.create({
  //         title: 'Success!',
  //         subTitle: 'Event saved successfully',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //       this.navCtrl.pop();
  //     },
  //     (err) => {
  //       let alert = this.alertCtrl.create({
  //         title: 'Failed!',
  //         subTitle: err,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   );
  // }

  pintar_nav(value){
    $("#navbar_evento").attr('class','toolbar toolbar-md');
    $("#navbar_evento").addClass('toolbar-md-'+value);
    this.event.status=value;
  }
  save(){
    let day = this.event.startDate;
    //INICIO NUEVA FORMA DE TRATAR LAS FECHAS


    let test = new Date(new Date(day).getTime()+1*24*60*60*1000);
    alert(test.getFullYear()+"-"+test.getMonth()+"-"+test.getDate());

    //INICIO NUEVA FORMA DE TRATAR LAS FECHAS







    // alert(day);//pq pone un dia de menos cuando crea la fecha?

    HomePage.prueba(this.event.startDate,this.event.endDate,this.event.status);
    this.navCtrl.pop();

  }
}
