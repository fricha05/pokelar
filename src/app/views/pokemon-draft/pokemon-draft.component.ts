import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Type } from 'src/app/models/type.model';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

enum DraftTurn {
  YOUR_SELECTION,
  ENEMY_SELECTION
}

@Component({
  selector: 'app-pokemon-draft',
  templateUrl: './pokemon-draft.component.html',
  styleUrls: ['./pokemon-draft.component.css']
})
export class PokemonDraftComponent implements OnInit {

  pokemonsAvailable: Array<Pokemon>;
  yourSelection: Pokemon;
  enemySelection: Pokemon;
  draftTurn: DraftTurn;
  
  constructor(public router: Router, private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokemonsAvailable = [];
    this.yourSelection = null;
    this.enemySelection = null;
    this.draftTurn = DraftTurn.YOUR_SELECTION;

    this.pokeApiService.getAllAvailablePokemon()
      .subscribe(
        res => this.pokemonsAvailable = res,
        err => console.log('ERROR', err),
      )
  }

  onPokemonSelection(pkm: Pokemon) {
    if (this.draftTurn === DraftTurn.YOUR_SELECTION) {
      this.yourSelection = pkm;
      this.draftTurn = DraftTurn.ENEMY_SELECTION;
    } else {
      this.enemySelection = pkm;
      this.router.navigate(['battle', this.yourSelection.name, this.enemySelection.name]);
    }
  }
}
