import { TestBed } from '@angular/core/testing';

import { PokemonAdapterService } from './pokemon-adapter.service';
import { Type } from '../models/type.model';

describe('PokemonAdapterService', () => {
  let service: PokemonAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert a type', () => {
    expect(PokemonAdapterService.convertType("psychic")).toBe(Type.Psychic)
  })
});
