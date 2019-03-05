import { Injectable } from '@angular/core';
import {defer, from, Observable, pipe} from 'rxjs';
import {FileMetaData} from '../../shared/file-metadata';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }

  upload(file: File): Observable<FileMetaData> {
   return this.addFileMetadata(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
  }
    ).pipe(
      switchMap(fileMeta => {
        return defer(() =>
          this.storage.ref('game-pictures' + fileMeta.id)
            .put(file)
            .then()
            ).pipe(
              map(fileRef => {
                return fileMeta;
              })
        );
      })
    );

  }

  addFileMetadata(meta: FileMetaData): Observable<FileMetaData> {
return defer(() =>
    this.db.collection('files')
      .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }
}

