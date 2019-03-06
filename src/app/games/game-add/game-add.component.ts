import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {GamesService} from '../games-service/games.service';
import {FileService} from '../../files/files/shared/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  imageChangedEvent: File;
  croppedImage: any = '';
  fileToUpload: File;
  gameFormGroup: FormGroup;
  constructor(private gs: GamesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fs: FileService) {this.gameFormGroup = new FormGroup({
    name: new FormControl('')
  }); }

  ngOnInit() {
  }
  addGame() {
    const gamedata = this.gameFormGroup.value;
    if (this.fileToUpload) {
      this.fs.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata => {
            gamedata.picturId = metadata.id;
            return  this.gs.addGame(gamedata);
          })
        )
        .subscribe(game => {
          this.router.navigate(['../'],
            {relativeTo: this.activatedRoute});
          window.alert('game with id' + game.id + 'was made URYAA');
        });
    }
  }
  uploadFile(event) {
    this.imageChangedEvent = event;
    this.fileToUpload = event.target.files[0];

  }
  imageCropped(event: ImageCroppedEvent) {
    //preview
    this.croppedImage = event.base64;
    //convertion for uploads
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.file], fileBeforeCrop.name,
      {type: fileBeforeCrop.type});
  }

}
