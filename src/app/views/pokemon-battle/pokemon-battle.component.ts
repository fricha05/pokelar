import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-pokemon-battle',
  templateUrl: './pokemon-battle.component.html',
  styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {

  constructor(private pokeApiService: PokeApiService,
    private battleService: BattleService) { }

  ngOnInit(): void {
    // TODO: get names from params

    this.getPokemonByName("rattata", true);
    this.getPokemonByName("quenotor", false);
  }

  getPokemonByName(name: string, mine: boolean): void {
    this.pokeApiService.getPokemonByName(name).subscribe(
      (p: Pokemon) => {
        this.battleService.setPokemon(p, mine);
      },
      (e => console.log(e))
    )
  }
}
