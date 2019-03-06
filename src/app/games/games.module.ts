import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import {FilesModule} from '../files/files.module';
import {GameListComponent} from './game-list/game-list.component';
import {GameAddComponent} from './game-add/game-add.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [GameListComponent, GameAddComponent],
  imports: [
    CommonModule,
    FilesModule,
    GamesRoutingModule,
    ImageCropperModule
  ]
})
export class GamesModule { }
