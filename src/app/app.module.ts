import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAddComponent } from './games/game-add/game-add.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { AppRoutingModule } from './app-routing.module';
import { GameRoutingModule } from './games/game-routing.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    GameAddComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
