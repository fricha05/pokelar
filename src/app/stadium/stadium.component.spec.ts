import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StadiumComponent } from './stadium.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { PokeApiService } from '../services/poke-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('StadiumComponent', () => {
  let component: StadiumComponent;
  let fixture: ComponentFixture<StadiumComponent>;
  let battleService = {
    reset: jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StadiumComponent
      ],
      providers: [ 
        { provide: BattleService, useValue: battleService },
        { provide: PokeApiService, useValue: {} },
        DatePipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    battleService.reset.mockReset();
    fixture = TestBed.createComponent(StadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called one time reset', () => {
    expect(battleService.reset).toHaveBeenCalledTimes(1);
  })
});
