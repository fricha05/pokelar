import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { Attack, Nature } from '../models/attack.model';
import { TypeMessage } from '../models/message-log.model';
import { StadiumComponent } from '../stadium/stadium.component';
import { BattleLogService } from './battle-log.service';
import { DecimalPipe } from '@angular/common';
import { Type } from '../models/type.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private static intervalId: NodeJS.Timeout;
  myPokemon: Pokemon;
  enemyPokemon: Pokemon;

  isPaused: boolean = false;
  isFighting: boolean = false;
  enemyAttack: boolean = false;
  turn: number = 1;

  constructor(public battleLogService: BattleLogService, private decimalPipe: DecimalPipe) { 
  }

  // Pause/Resume the fight
  pauseResume() {
    this.isPaused = !this.isPaused;
    this.battleLogService.add(this.isPaused ? "Combat en pause..." : "Le combat continue !")
  }

  // Set pokemon and reset state
  setPokemon(pokemon: Pokemon, mine: boolean = true) {
    if (mine) {
      this.myPokemon = pokemon;
    } else {
      this.enemyPokemon = pokemon;
    }

    // Reset state
    this.reset();
  }

  // Resets the entire fight
  reset(): void {
    clearInterval(BattleService.intervalId);
    this.battleLogService.clear();
    this.isFighting = false;
    this.isPaused = false;
    
    if (this.myPokemon)
      this.myPokemon.health = this.myPokemon.maxHealth;

    if (this.enemyPokemon)
      this.enemyPokemon.health = this.enemyPokemon.maxHealth;

    /*const attack: Attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);

    this.myPokemon = new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      [attack]);
    this.enemyPokemon = new Pokemon("Nidoran", Type.Poison, 17, 60, 12, 43, 67, 23, 43, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/29.png", [attack]);*/
  }

  // Determines if pokemon1 will attack in first
  static isFirstStarting(pokemon1: Pokemon, pokemon2: Pokemon): boolean {
    if (pokemon1.speed === pokemon2.speed) {
        return Math.floor(Math.random() * 2) + 1 === 1; 
    } else {
        return pokemon1.speed > pokemon2.speed;
    }
  }

  // Determines if the attack is successful depending on the attack's precision
  private static isAttackSuccessful(attack: Attack) {
      const roll: number = Math.floor(Math.random() * 100) + 1;
      return roll <= attack.precision;
  }

  // Returns damage dealt
  static calculateDamage(attacker: Pokemon, receiver: Pokemon, attack: Attack): number {
      if (attack.nature === Nature.Physical) {
          return Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) 
              * attacker.attack * attack.power / receiver.defense) / 50) + 2;
      } else {
          return Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) 
              * attacker.spAttack * attack.power / receiver.spDefense) / 50) + 2;
      }
  }

  // Get a random attack from the Attacker and removes life to the receiver if the attack is successful
  attack(attacker: Pokemon, receiver: Pokemon): void {
      const attack: Attack = attacker.getRandomAttack();
      const typeMessage: TypeMessage = attacker == this.myPokemon ? TypeMessage.MY_PKMN : TypeMessage.ENEMY_PKMN;

      if (BattleService.isAttackSuccessful(attack)) {

          this.battleLogService.add(`${attacker.name} attaque ${attack.name}.`, typeMessage);
          const dmg: number = BattleService.calculateDamage(attacker, receiver, attack);
          receiver.health -= dmg;
          this.battleLogService.add(`${attacker.name} inflige ${this.decimalPipe.transform(dmg, "1.0")} points de dégats.`, typeMessage);

          if (receiver.isKO()) { 
              receiver.health = 0; // Remise à 0 pour ne pas afficher de points négatifs
              this.battleLogService.add(`${receiver.name} est KO.`, TypeMessage.IMPORTANT);
          }
      } else {
          this.battleLogService.add(`${attacker.name} rate son attaque.`, typeMessage);
      }
  }

  // Each round is an interval, in which each pokemon attacks once
  rounds(pokemon: Pokemon, pokemon2: Pokemon, ms: number): Observable<Pokemon> {
    this.enemyAttack = BattleService.isFirstStarting(pokemon2, pokemon);

    return from(new Promise<Pokemon>((resolve, reject) => {
      BattleService.intervalId = setInterval(() => {
        if(!this.isPaused){
            const attacker: Pokemon = this.enemyAttack ? pokemon2 : pokemon;
            const receiver: Pokemon = this.enemyAttack ? pokemon : pokemon2;

            // Attack
            this.attack(attacker, receiver);
            if (receiver.isKO()) {
              resolve(attacker);
              clearInterval(BattleService.intervalId);
              return;
            }

            // Change attacker after turn ends
            this.enemyAttack = !this.enemyAttack;
          }
        }, ms);
    }));
  }
}
