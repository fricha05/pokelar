import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBattleComponent } from './pokemon-battle.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { BattleService } from 'src/app/services/battle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('PokemonBattleComponent', () => {
  let component: PokemonBattleComponent;
  let fixture: ComponentFixture<PokemonBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonBattleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        { provide: BattleService, useValue: {} },
        PokeApiService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
