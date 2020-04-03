import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDraftComponent } from './pokemon-draft.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Type } from 'src/app/models/type.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PokemonDraftComponent', () => {
  let component: PokemonDraftComponent;
  let fixture: ComponentFixture<PokemonDraftComponent>;

  let pokeServiceMock = {
    getAllAvailablePokemon: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PokemonDraftComponent ],
      providers: [
        { provide: PokeApiService, useValue: pokeServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() }}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    pokeServiceMock.getAllAvailablePokemon.mockReset();
    pokeServiceMock.getAllAvailablePokemon.mockImplementation(() => of([
      new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, "", "", []),
      new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, "", "", []),
      new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, "", "", [])
    ]));
    fixture = TestBed.createComponent(PokemonDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all pokemons available', () => {
    expect(pokeServiceMock.getAllAvailablePokemon).toHaveBeenCalledTimes(1);
  })

  it('should select a pkm on first click', () => {
    const firstSelection = new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, "", "", []);
    const secondSelection = new Pokemon("Test", Type.Normal, 20, 130, 120, 123, 80, 80, 187, "", "", []);

    component.onPokemonSelection(firstSelection);
    expect(component.yourSelection).toEqual(firstSelection);

    component.onPokemonSelection(secondSelection);
    expect(component.enemySelection).toEqual(secondSelection);
  })
});
