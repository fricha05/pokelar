import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Attack, Nature } from '../models/attack.model';
import { Type } from '../models/type.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonAdapterService {

  constructor() { }

  public static mapPokemon(name: string, json): Pokemon {
    return new Pokemon(
      name.substring(0, 1).toUpperCase() + name.substring(1),
      PokemonAdapterService.convertType(json["types"][0].type.name),
      1, // Level
      json["stats"][5].base_stat,
      json["stats"][4].base_stat,
      json["stats"][3].base_stat,
      json["stats"][2].base_stat,
      json["stats"][1].base_stat,
      json["stats"][0].base_stat,
      json["sprites"].front_default,
      json["sprites"].back_default,
      [new Attack("Charge", Type.Normal, 80, 100, Nature.Physical)]
    );
  }

  // Convert String to enum Type
  public static convertType(type: string): Type {
    const capitalizedType: string = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
   return Type[capitalizedType];
 }
}
