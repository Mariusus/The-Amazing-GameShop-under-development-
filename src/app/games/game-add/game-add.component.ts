import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {GamesService} from '../games-service/games.service';
import {FileService} from '../../files/files/shared/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageMetadata} from '../../files/shared/image-metadata';
import {Game} from '../shared/game.model';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  gameFormGroup: FormGroup;
   croppedBlob: Blob;
  constructor(private gs: GamesService,
              private activatedRoute: ActivatedRoute,
              private router: Router
             ) {this.gameFormGroup = new FormGroup({
    name: new FormControl('')
  }); }

  ngOnInit() {
  }
  addGame() {
    const gamedata = this.gameFormGroup.value;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];

    const imageMeta: ImageMetadata = {
     imageBlob: this.croppedBlob,
     fileMeta: {
       name: fileBeforeCrop.name,
       type: 'image/png',
       size: fileBeforeCrop.size
     }
   };
    this.gs.addGameWithImage(
      gamedata,
      this.getMetaDataForImage(),
    ).subscribe(game => {
          this.router.navigate(['../'],
            {relativeTo: this.activatedRoute});
          window.alert('game with id' + game.id + 'was made URYAA');
        });
  }
  private getMetaDataForImage(): ImageMetadata {
if (this.imageChangedEvent && this.imageChangedEvent.target &&
this.imageChangedEvent.target.files && this.imageChangedEvent.target.files.lenght > 0) {
  const fileBeforeCrop = this.imageChangedEvent.target.files[0];
  return {
    imageBlob: this.croppedBlob,
    fileMeta: {
      name: fileBeforeCrop.name,
      type: 'image/png',
      size: fileBeforeCrop.size
    }
  };
}
return undefined;
  }
  uploadFile(event) {
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    //preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

}
