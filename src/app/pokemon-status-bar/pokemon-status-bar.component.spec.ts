import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatusBarComponent } from './pokemon-status-bar.component';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';

describe('PokemonStatusBarComponent', () => {
  let component: PokemonStatusBarComponent;
  let fixture: ComponentFixture<PokemonStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatusBarComponent);
    component = fixture.componentInstance;
    component.pokemon = new Pokemon("Ferosinge", Type.Fighting, 23, 140, 150, 100, 56, 54, 120, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
