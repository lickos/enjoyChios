import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { PlacesListPageModule } from './../places-list/places-list.module';
import { PlaceDetailsPageModule } from './../place-details/place-details.module';
import { DirectionsPageModule } from './../directions/directions.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    PlacesListPageModule,
    PlaceDetailsPageModule,
    DirectionsPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
