import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WondersRoutingModule } from './wonders-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { WonderComponent } from './pages/wonder/wonder.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { WonderCardComponent } from './components/wonder-card/wonder-card.component';
import { ImagePipe } from './pipes/image.pipe';
import { ConfirmComponent } from './components/confirm/confirm.component';
@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    WonderComponent,
    HomeComponent,
    ListComponent,
    WonderCardComponent,
    ImagePipe,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    WondersRoutingModule,
    MaterialModule

  ]
})
export class WondersModule { }
