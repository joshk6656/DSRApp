import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventPage } from './addevent';

@NgModule({
  declarations: [
    AddEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventPage),
  ],
})
export class AddEventPageModule {}
