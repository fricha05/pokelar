import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { PokeApiService } from './poke-api.service';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';

describe('PokeApiService', () => {
  let service: PokeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 1 pokemon', async () => {
    const pokeApiService: PokeApiService = TestBed.get(PokeApiService);
    const http = TestBed.get(HttpTestingController);
    
    const pokemon = new Pokemon("Roucool", Type.Fighting, 23, 140, 150, 100, 56, 54, 120, "", "", []);

    pokeApiService.getPokemonByName("roucool").subscribe((p: Pokemon) => {
      expect(p).toBeTruthy();
    });
    http.expectOne(PokeApiService.API_URL + "pidgey").flush(pokemon);
  });

  it('should convert a type', () => {
    expect(PokeApiService.convertType("psychic")).toBe(Type.Psychic)
  })
});
