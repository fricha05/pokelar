import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StadiumComponent } from './stadium.component';

import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

describe('StadiumComponent', () => {
  let component: StadiumComponent;
  let fixture: ComponentFixture<StadiumComponent>;

  const attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);
  const attack2 = new Attack("Forte-Paume", Type.Fighting, 60, 100, Nature.Physical);
  
  let capumain: Pokemon;
  let ferosinge: Pokemon;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StadiumComponent
       ],
      providers: [
        DatePipe,
        DecimalPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    capumain = new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, [attack]);
    ferosinge = new Pokemon("Ferosinge", Type.Fighting, 23, 140, 150, 100, 56, 54, 120, [attack2]);
    component.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('determine if a pokemon begins', () => {
    expect(StadiumComponent.isFirstStarting(capumain, ferosinge))
        .toBeTruthy();
  })

  it('calculate the physical damage dealt', () => {
      expect(StadiumComponent.calculateDamage(capumain, ferosinge, attack))
          .toBe(11);
  })

  it('calculate the magical damage dealt', () => {
    const spAttack = new Attack("Météores", Type.Normal, 60, 100, Nature.Special);
    expect(StadiumComponent.calculateDamage(capumain, ferosinge, spAttack))
        .toBe(19);
  })

  it('should fail an attack', () => {
    let unaccurateAttack: Attack = new Attack("It's over 9000", Type.Dragon, 9001, 0, Nature.Special)
    capumain.attacks = [unaccurateAttack];

    component.attack(capumain, ferosinge);
    expect(ferosinge.health).toBe(140);
  })

  it('should run a fight', async () => {
    component.isFighting = true;
    await component.rounds(capumain, ferosinge, 10);
    expect(capumain.isKO()).toBeTruthy();
    expect(ferosinge.isKO()).toBeFalsy();
  })

  it('should reset the component', () => {
    component.myPokemon = capumain;
    component.enemyPokemon = ferosinge;

    component.reset();
    expect(component.isFighting).toBeFalsy();
    expect(component.isPaused).toBeFalsy();

    expect(component.battleLogService.messages.length).toBe(0);
    expect(component.myPokemon.health).toBe(component.myPokemon.maxHealth);
    expect(component.enemyPokemon.health).toBe(component.enemyPokemon.maxHealth);
  })

  it('should pause and resume the fight', () => {
    component.isPaused = false;
    component.pauseResume();
    expect(component.isPaused).toBeTruthy();
    component.pauseResume();
    expect(component.isPaused).toBeFalsy();
  })
});
