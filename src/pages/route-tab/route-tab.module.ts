import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteTabPage } from './route-tab';

@NgModule({
  declarations: [
    RouteTabPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteTabPage),
  ],
})
export class RouteTabPageModule {}
