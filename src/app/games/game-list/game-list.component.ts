import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {GamesService} from '../games-service/games.service';
import {Game} from '../shared/game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
games: Observable<Game[]>;
  constructor(private gs: GamesService) { }

  ngOnInit() {
    this.games = this.gs.getGames();
  }
  deleteGame(game: Game) {
    const obs = this.gs.deleteGame(game.id);
    obs.subscribe(() => {
        window.alert('balanced as all things should be');
      });
  }
}
