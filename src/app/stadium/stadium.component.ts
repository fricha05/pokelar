import { Component, OnInit, OnDestroy } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit, OnDestroy {
  
  constructor(
    public battleService: BattleService,
    public pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.battleService.reset();
  }

  ngOnDestroy(): void {
    this.battleService.reset();
  }
}