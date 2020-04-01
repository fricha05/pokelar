import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Pokemon } from '../models/pokemon.model';
import { BattleLogService } from './battle-log.service';

describe('BattleService', () => {
  let service: BattleService;

  const attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);
  const attack2 = new Attack("Forte-Paume", Type.Fighting, 60, 100, Nature.Physical);
  
  let capumain: Pokemon;
  let ferosinge: Pokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePipe,
        DecimalPipe,
        BattleLogService
      ]
    });
    service = TestBed.inject(BattleService);

    capumain = new Pokemon("Capumain", Type.Normal, 20, 130, 120, 123, 80, 80, 187, [attack]);
    ferosinge = new Pokemon("Ferosinge", Type.Fighting, 23, 140, 150, 100, 56, 54, 120, [attack2]);
    service.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('determine if a pokemon begins', () => {
    expect(BattleService.isFirstStarting(capumain, ferosinge))
        .toBeTruthy();
  })

  it('calculate the physical damage dealt', () => {
      expect(BattleService.calculateDamage(capumain, ferosinge, attack))
          .toBe(11);
  })

  it('calculate the magical damage dealt', () => {
    const spAttack = new Attack("Météores", Type.Normal, 60, 100, Nature.Special);
    expect(BattleService.calculateDamage(capumain, ferosinge, spAttack))
        .toBe(19);
  })

  it('should fail an attack', () => {
    let unaccurateAttack: Attack = new Attack("It's over 9000", Type.Dragon, 9001, 0, Nature.Special)
    capumain.attacks = [unaccurateAttack];

    service.attack(capumain, ferosinge);
    expect(ferosinge.health).toBe(140);
  })

  it('should run a fight', async () => {
    service.isFighting = true;
    await service.rounds(capumain, ferosinge, 10);
    expect(capumain.isKO()).toBeTruthy();
    expect(ferosinge.isKO()).toBeFalsy();
  })

  it('should reset the service', () => {
    service.myPokemon = capumain;
    service.enemyPokemon = ferosinge;

    service.reset();
    expect(service.isFighting).toBeFalsy();
    expect(service.isPaused).toBeFalsy();

    expect(service.battleLogService.messages.length).toBe(0);
    expect(service.myPokemon.health).toBe(service.myPokemon.maxHealth);
    expect(service.enemyPokemon.health).toBe(service.enemyPokemon.maxHealth);
  })

  it('should pause and resume the fight', () => {
    service.isPaused = false;
    service.pauseResume();
    expect(service.isPaused).toBeTruthy();
    service.pauseResume();
    expect(service.isPaused).toBeFalsy();
  })
});
