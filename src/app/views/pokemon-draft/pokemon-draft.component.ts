import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Type } from 'src/app/models/type.model';

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
  
  constructor() { }

  ngOnInit(): void {
    this.pokemonsAvailable = [];
    this.yourSelection = null;
    this.enemySelection = null;
    this.draftTurn = DraftTurn.YOUR_SELECTION;

    this.pokemonsAvailable.push(new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      []));
      this.pokemonsAvailable.push(new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      []));
      this.pokemonsAvailable.push(new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      []));
      this.pokemonsAvailable.push(new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      []));
      this.pokemonsAvailable.push(new Pokemon("Roucool", Type.Flying, 15, 76, 70, 43, 67, 23, 54, 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", 
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png", 
      []));

  }

  onPokemonSelection(pkm: Pokemon) {
    console.log('Pokemon clicked', pkm);

    if(this.draftTurn === DraftTurn.YOUR_SELECTION) {
      this.yourSelection = pkm;
      this.draftTurn = DraftTurn.ENEMY_SELECTION;
    } else {
      this.enemySelection = pkm;
      // TODO: Route to battle
      console.log('GO TO BATTLE');
      alert('GO TO BATTLE');
    }
  }
}
