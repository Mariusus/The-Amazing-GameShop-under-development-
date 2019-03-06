import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {GameAddComponent} from './game-add/game-add.component';

const routes: Routes = [
  {
    path: 'add',
    component: GameAddComponent
  },
  {
    path: '',
    component: GameListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
