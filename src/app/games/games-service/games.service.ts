import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, pipe} from 'rxjs';
import {Game} from '../shared/game.model';
import {map, switchMap} from 'rxjs/operators';
import {promise} from 'selenium-webdriver';
import {ImageMetadata} from '../../files/shared/image-metadata';
import {FileService} from '../../files/files/shared/file.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private db: AngularFirestore, private fs: FileService) {
  }

  getGames(): Observable<Game[]> {
    return this.db
      .collection<Game>('games')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Game;
            return {
              id: action.payload.doc.id,
              name: data.name,
              description: data.description,
              genre: data.genre
            };
          });
        })
      );
  }

  deleteGame(id: string): Observable<void> {
    return Observable.create(obs => {
      this.db.doc<Game>('games/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(obs.finally());
    });
    //this.db.doc<Game>('games/' + id).delete();
  }
  addGameWithImage(game: Game, imageMeta: ImageMetadata)
  : Observable<Game> {
    return this.fs.uploadImage(imageMeta)
      .pipe(
      switchMap(metadata => {
        game.pictureId = metadata.id;
        return  this.addGame(game);
      })
    );
  }

  addGame(game: Game): Observable<Game> {
    return from(
      this.db.collection('games')
        .add(
          {
            name: game.name,
            pictureId: game.pictureId,
            description: game.description,
            genre: game.genre
  }
  )
  ).pipe(
      map(gameRef => {
        game.id = gameRef.id;
        return game;
      })
    );
  }
}

