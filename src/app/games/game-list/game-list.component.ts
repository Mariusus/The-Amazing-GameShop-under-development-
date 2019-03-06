import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {GamesService} from '../games-service/games.service';
import {Game} from '../shared/game.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/files/shared/file.service';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
games: Observable<Game[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gs: GamesService,
    private fs: FileService) {
  }

  ngOnInit() {
    this.games = this.gs.getGames()
      .pipe(
        tap(games => {
          games.forEach(game => {
            if (game.pictureId) {
              this.fs.getFileUrl(game.pictureId)
                .subscribe(url => {
                  game.url = url;
                });
            }
          });
        })
      );
  }
  deleteGame(game: Game) {
    const obs = this.gs.deleteGame(game.id);
    obs.subscribe(() => {
        window.alert('balanced as all things should be');
      });
  }

}
