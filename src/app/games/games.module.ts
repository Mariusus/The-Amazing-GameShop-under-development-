import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import {FilesModule} from '../files/files.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilesModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
