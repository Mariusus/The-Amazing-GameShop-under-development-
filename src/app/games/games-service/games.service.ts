import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Game} from '../shared/game.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private db: AngularFirestore) {
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
}
