import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { BattleService } from 'src/app/services/battle.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pokemon-battle',
  templateUrl: './pokemon-battle.component.html',
  styleUrls: ['./pokemon-battle.component.css']
})
export class PokemonBattleComponent implements OnInit {
  static MY_DEFAULT_POKEMON: string = "roucool";
  static ENEMY_DEFAULT_POKEMON: string = "nidoran";

  constructor(private pokeApiService: PokeApiService,
    public battleService: BattleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.myPokemon) {
        this.getPokemonByName(params.myPokemon, true);
      } else if (!this.battleService.myPokemon) {
        this.getPokemonByName(PokemonBattleComponent.MY_DEFAULT_POKEMON, true);
      }

      if (params.enemyPokemon) {
        this.getPokemonByName(params.enemyPokemon, false);
      } else if (!this.battleService.enemyPokemon) {
        this.getPokemonByName(PokemonBattleComponent.ENEMY_DEFAULT_POKEMON, false);
      }
    });
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
