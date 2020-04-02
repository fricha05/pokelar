import { Component, OnInit, OnDestroy } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { PokeApiService } from '../services/poke-api.service';
import { BattleLogService } from '../services/battle-log.service';
import { Pokemon } from '../models/pokemon.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit, OnDestroy {
  
  constructor(
    public battleLogService: BattleLogService,
    public battleService: BattleService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.battleService.reset();
  }

  ngOnDestroy(): void {
    this.battleService.reset();
  }

  // Pause/Resume the fight
  pauseResume() {
    this.battleService.pauseResume();
  }

  // Start the fight
  fight(): void {
    this.battleService.isFighting = true;
    this.battleLogService.add(`${this.datePipe.transform(new Date(), 'HH:mm:ss')}: Le combat commence.`);

    this.battleService.rounds(this.battleService.myPokemon, this.battleService.enemyPokemon, 1000)
      .subscribe(
        (winner: Pokemon) => {
            this.battleLogService.add(`${winner.name} a gagné !`);
        },
        (e => console.log(e)),
        () => {
          this.battleService.isFighting = false;
        }
      );
  }
}