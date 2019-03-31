import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import {GamesService} from '../games-service/games.service';
import {FileService} from '../../files/files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Game} from '../shared/game.model';
import {By} from '@angular/platform-browser';
import {by, element} from 'protractor';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import construct = Reflect.construct;
import {count} from 'rxjs/operators';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let dh: DOMhelper;
  let helper: Helper;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameListComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'add', component: DummyComponent}
          ]
        )
      ],
      providers: [
        {provide: GamesService, useClass: GameServiceStub},
        {provide: FileService, useClass: FileServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    helper = new Helper();
    dh = new DOMhelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain one "+" button', () => {
    expect(dh.singleText('button')).toBe('+');
  });

  it('should contain an h2 tag', () => {
   expect(dh.count('h2')).toBe(1);
  });
  it('should show one list item when 1 game is in', () => {
    component.games = of([
      {id: 'in', name: 'potato', genre: 'rap', description: 'this solo was nice'}
    ]);
    expect(dh.count).toBe(1);
  });

  @Component({template: ''})
  class DummyComponent {
  }

  class FileServiceStub {

  }

  class GameServiceStub {
    getGames(): Observable<Game[]> {
      return of([]);
    }
  }

  class DOMhelper {
    private fixture: ComponentFixture<GameListComponent>
    constructor(fixture: ComponentFixture<GameListComponent>) {
      this.fixture = fixture;
    }
    singleText(tagName: string): string {
      const h2Ele = fixture.debugElement.query(By.css(tagName));
      if (h2Ele) {
        return h2Ele.nativeElement.textContent;
      }
    }
    count(tagname: string): number {
      const elements = this.fixture.debugElement
        .queryAll(By.css(tagname));
      return elements.length;
    }
  }
}

