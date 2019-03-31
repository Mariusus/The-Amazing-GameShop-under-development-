import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddComponent } from './game-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {GamesService} from '../games-service/games.service';
import {Observable} from 'rxjs';
import {Game} from '../shared/game.model';

describe('GameAddComponent', () => {
  let component: GameAddComponent;
  let fixture: ComponentFixture<GameAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddComponent ],
      imports: [ReactiveFormsModule,
        ImageCropperModule,
      RouterTestingModule],
      providers: [
        {provide: GamesService, useClass: GameServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class FileServiceStub {

}

class GameServiceStub {
addGame(): Observable<Game> {
 return this.addGame();
}
}
