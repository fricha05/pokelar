import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBattleComponent } from './pokemon-battle.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { BattleService } from 'src/app/services/battle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Nature, Attack } from 'src/app/models/attack.model';
import { Type } from 'src/app/models/type.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { DecimalPipe } from '@angular/common';

describe('PokemonBattleComponent', () => {
  let component: PokemonBattleComponent;
  let fixture: ComponentFixture<PokemonBattleComponent>;
  let params: any = { myPokemon: 'pikachu', enemyPokemon: 'rattata' };

  const attack: Attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);
  const pikachu: Pokemon = new Pokemon("Pikachu", Type.Electric, 20, 130, 120, 123, 80, 80, 187, "", "", [attack]);
  const rattata: Pokemon = new Pokemon("Rattata", Type.Normal, 23, 140, 150, 100, 56, 54, 120, "", "", [attack]);
  const roucool: Pokemon = new Pokemon("Roucool", Type.Flying, 23, 120, 131, 90, 60, 78, 110, "", "", [attack]);

  const mockPokeApiService = {
    getPokemonByName: jest.fn((name: string): Observable<Pokemon> => { 
      switch(name) {
        case 'pikachu': 
          return of(pikachu);
        case 'rattata':
          return of(rattata);
        case 'roucool':
          return of(roucool);
      }
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonBattleComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        BattleService,
        { provide: ActivatedRoute, useValue: { params: of(params)} },
        { provide: PokeApiService, useValue: mockPokeApiService },
        DecimalPipe
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

  it('should get pokemon', async () => {
    await component.getPokemonByName("pikachu", true)
    expect(component.battleService.myPokemon).toBe(pikachu);
    await component.getPokemonByName("rattata", false);
    expect(component.battleService)
  })
});
