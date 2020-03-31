import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumComponent } from './stadium.component';
import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { PokemonComponent } from '../pokemon/pokemon.component';

describe('StadiumComponent', () => {
  let component: StadiumComponent;
  let fixture: ComponentFixture<StadiumComponent>;

  const attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);
  const attack2 = new Attack("Forte-Paume", Type.Fighting, 60, 100, Nature.Physical);
  
  const capumain: Pokemon = new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, [attack]);
  const ferosinge: Pokemon = new Pokemon("Ferosinge", Type.Fighting, 23, 140, 150, 100, 56, 54, 120, [attack2]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadiumComponent, PokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('determine if a pokemon begins', () => {
    expect(StadiumComponent.isFirstStarting(capumain, ferosinge))
        .toBeTruthy()
  })

  it('calculate the physical damage dealt', () => {
      expect(StadiumComponent.calculateDamage(capumain, ferosinge, attack))
          .toBe(11)
  })

  it('run a fight', async () => {
    await component.rounds(capumain, ferosinge);
    expect(capumain.isKO()).toBeTruthy();
    expect(ferosinge.isKO()).toBeFalsy();
  })

});
