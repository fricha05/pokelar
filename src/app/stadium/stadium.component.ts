import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';
import { BattleLogService } from '../services/battle-log.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {
  
  private static intervalId: NodeJS.Timeout;
  pokemon1: Pokemon;
  pokemon2: Pokemon;

  constructor(private battleLogService: BattleLogService) { }

  ngOnInit(): void {
    const attack: Attack = new Attack("Charge", Type.Normal, 40, 100, Nature.Physical);

    this.pokemon1 = new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, [attack]);
    this.pokemon2 = new Pokemon("Nidoran", Type.Poison, 17, 60, 12, 43, 67, 23, 43, [attack]);
  }

  fight(): void {
    this.battleLogService.add("Le combat commence.");

    this.rounds(this.pokemon1, this.pokemon2)
        .then((winner: Pokemon) => {
            this.battleLogService.add(`${winner.name} a gagné !`);
        })
  }

  static isFirstStarting(pokemon1: Pokemon, pokemon2: Pokemon): boolean {
      if (pokemon1.speed === pokemon2.speed) {
          return Math.floor(Math.random() * 2) + 1 === 1; 
      } else {
          return pokemon1.speed > pokemon2.speed;
      }
  }

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

  private attack(attacker: Pokemon, receiver: Pokemon): void {
      let attack: Attack = attacker.getRandomAttack();
      if (StadiumComponent.isAttackSuccessful(attack)) {
          this.battleLogService.add(`${attacker.name} attaque ${attack.name}.`);
          const dmg: number = StadiumComponent.calculateDamage(attacker, receiver, attack);
          receiver.health -= dmg;
          this.battleLogService.add(`${attacker.name} inflige ${dmg} points de dégâts.`);

          if (receiver.health <= 0) { 
              receiver.health = 0; // Remise à 0 pour ne pas afficher de points négatifs
              this.battleLogService.add(`${receiver.name} est KO.`)
          }

      } else {
          this.battleLogService.add(`${attacker.name} rate son attaque.`);
      }
  }

  rounds(pokemon: Pokemon, pokemon2: Pokemon): Promise<Pokemon> {
      let i: number = 1;
      return new Promise<Pokemon>((resolve, reject) => {
        StadiumComponent.intervalId = setInterval(() => {
              const first: Pokemon = StadiumComponent.isFirstStarting(pokemon, pokemon2) ? pokemon : pokemon2;
              const second: Pokemon = StadiumComponent.isFirstStarting(pokemon, pokemon2) ? pokemon2 : pokemon;
  
              this.battleLogService.add(`Tour ${i++}`);

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
          }, 500);
      })
  }
}
