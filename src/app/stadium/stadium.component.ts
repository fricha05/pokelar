import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';
import { BattleLogService } from '../services/battle-log.service';
import { TypeMessage } from '../models/message-log.model';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit, OnDestroy {
  
  private static intervalId: NodeJS.Timeout;
  myPokemon: Pokemon;
  enemyPokemon: Pokemon;

  isPaused: boolean = false;
  isFighting: boolean = false;

  constructor(public battleLogService: BattleLogService, private datePipe: DatePipe, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
    this.reset();
  }

  // Pause/Resume the fight
  pauseResume() {
    this.isPaused = !this.isPaused;
    this.battleLogService.add(this.isPaused ? "Combat en pause..." : "Le combat continue !")
  }

  // Start the fight
  fight(): void {
    this.isFighting = true;
    const msg = `${this.datePipe.transform(new Date(), 'hh:mm:ss')}: Le combat commence.`;

    this.battleLogService.add(msg);

    this.rounds(this.myPokemon, this.enemyPokemon, 1000)
        .then((winner: Pokemon) => {
            this.battleLogService.add(`${winner.name} a gagné !`);
        })
        .finally(() => {
          this.isFighting = false;
        })
  }

  // Resets the entire fight
  reset(): void {
    clearInterval(StadiumComponent.intervalId);
    this.battleLogService.clear();
    this.isFighting = false;
    this.isPaused = false;
    
    const attack: Attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);

    this.myPokemon = new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, [attack]);
    this.enemyPokemon = new Pokemon("Nidoran", Type.Poison, 17, 60, 12, 43, 67, 23, 43, [attack]);
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

      if (StadiumComponent.isAttackSuccessful(attack)) {

          this.battleLogService.add(`${attacker.name} attaque ${attack.name}.`, typeMessage);
          const dmg: number = StadiumComponent.calculateDamage(attacker, receiver, attack);
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
  rounds(pokemon: Pokemon, pokemon2: Pokemon, ms: number): Promise<Pokemon> {
      let i: number = 1;
      return new Promise<Pokemon>((resolve, reject) => {
        StadiumComponent.intervalId = setInterval(() => {
          if(!this.isPaused){
              const first: Pokemon = StadiumComponent.isFirstStarting(pokemon, pokemon2) ? pokemon : pokemon2;
              const second: Pokemon = StadiumComponent.isFirstStarting(pokemon, pokemon2) ? pokemon2 : pokemon;
  
              this.battleLogService.add(`Tour ${i++}`, TypeMessage.INFO);

              // First attack
              this.attack(first, second);
  
              if (!second.isKO()) {
                // Second Attack
                this.attack(second, first);

                if (first.isKO()) {
                    resolve(second);
                    clearInterval(StadiumComponent.intervalId);
                    return;
                }
              } else {
                  resolve(first);
                  clearInterval(StadiumComponent.intervalId);
                  return;
              }
            }
          }, ms);
      })
  }
}
