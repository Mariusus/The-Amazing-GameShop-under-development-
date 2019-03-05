import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {GamesService} from '../games-service/games.service';
import {Game} from '../shared/game.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/files/shared/file.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
games: Observable<Game[]>;
fileToUpload: File;
gameFormGroup: FormGroup;
  constructor(private gs: GamesService, private fs: FileService) {
    this.gameFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.games = this.gs.getGames();
  }
  deleteGame(game: Game) {
    const obs = this.gs.deleteGame(game.id);
    obs.subscribe(() => {
        window.alert('balanced as all things should be');
      });
  }
  addGame() {
    const gamedata = this.gameFormGroup.value;
    if (this.fileToUpload) {
      this.fs.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata => {
            gamedata.picturId = metadata.id;
            return  this.gs.addGame(gamedata)
          })
        )
        .subscribe(game => {
          window.alert('game with id' + game.id + 'was made URYAA');
        });
    }
    this.gs.addGame(gamedata)
      .subscribe(game => {
      window.alert('game with id' + game.id + 'was made URYAA');
    });
  }
  uploadFile(event) {
    this.fileToUpload = event.target.files[0];

     }
}
