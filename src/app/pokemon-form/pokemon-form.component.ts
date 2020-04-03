import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Pokemon } from '../models/pokemon.model';
import { PokeApiService } from '../services/poke-api.service';
import { BattleService } from '../services/battle.service';
import { PokemonDraftComponent } from '../views/pokemon-draft/pokemon-draft.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  creationForm: FormGroup;
  myPokemon: Pokemon;
  hasCreated: boolean = false;

  constructor(
    public pokeApiService: PokeApiService,
    public battleService: BattleService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.creationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      health: new FormControl('', Validators.required),
      attack: new FormControl('', Validators.required),
      defense: new FormControl('', Validators.required),
      spAttack: new FormControl('', Validators.required),
      spDefense: new FormControl('', Validators.required),
      speed: new FormControl('', Validators.required)
    })
  }

  save() {
    console.log("form submit");
    if(this.creationForm.valid){
      this.pokeApiService.getPokemonByName(this.creationForm.value.name)
        .subscribe(
          (pkm: Pokemon) => {
            const pokemon: Pokemon = new Pokemon(pkm.name, pkm.type, 
              this.creationForm.value.level,
              this.creationForm.value.health,
              this.creationForm.value.attack,
              this.creationForm.value.defense,
              this.creationForm.value.spAttack,
              this.creationForm.value.spDefense,
              this.creationForm.value.speed,
              pkm.frontImgSrc, pkm.backImgSrc, pkm.attacks);
            this.battleService.setPokemon(pokemon, !this.hasCreated);
            this.router.navigate(['battle']);
          },
          (err) => { console.log(err) }
        );
    }
  }

  getNamesList(): string[] {
    return Object.keys(PokeApiService.availablePokemons);
  }
}
