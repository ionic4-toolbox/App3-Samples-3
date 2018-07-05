import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
import {HttpClientModule} from "@angular/common/http";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {RouteTabPage} from '../pages/route-tab/route-tab'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfessorsServiceProvider } from '../providers/professors-service/professors-service';
import { NodeServicesProvider } from '../providers/node-services/node-services';
import { GeolocationServiceProvider } from '../providers/geolocation-service/geolocation-service';
import { ModalProfessorPage } from "../pages/modal-professor/modal-professor";
import {ModalRoutePage} from '../pages/modal-route/modal-route';
import {ModalDirectoryDistanceModePage} from '../pages/modal-directory-distance-mode/modal-directory-distance-mode'
import {ModalDirectoryProximityModePage} from '../pages/modal-directory-proximity-mode/modal-directory-proximity-mode'
import {ProfessorListPage} from '../pages/professor-list/professor-list';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    HomePage,
    TabsPage,
    ModalProfessorPage,
    ModalDirectoryDistanceModePage,
    RouteTabPage,
    ModalRoutePage,
    ModalDirectoryProximityModePage,
    ProfessorListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    HomePage,
    TabsPage,
    ModalProfessorPage,
    RouteTabPage,
    ModalRoutePage,
    ModalDirectoryDistanceModePage,
    ModalDirectoryProximityModePage,
    ProfessorListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfessorsServiceProvider,
    NodeServicesProvider,
    GeolocationServiceProvider
  ]
})
export class AppModule {}
