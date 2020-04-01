import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';
import { Attack, Nature } from '../models/attack.model';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  public static API_URL: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  private static mapPokemon(json): Pokemon {
    return new Pokemon(
      name,
      this.convertType(json["types"][0].type.name),
      1, // Level
      json["stats"][5].base_stat,
      json["stats"][4].base_stat,
      json["stats"][3].base_stat,
      json["stats"][2].base_stat,
      json["stats"][1].base_stat,
      json["stats"][0].base_stat,
      [new Attack("Charge", Type.Normal, 40, 100, Nature.Physical)]
    );
  }
  
  getPokemonByName(pokemonName: string): Observable<any> {
    const url: string = PokeApiService.API_URL + pokemonName;
    return this.http.get(url)
      .pipe(map((res: Response) => PokeApiService.mapPokemon(res)));
  }

  // Convert String to enum Type
  public static convertType(type: string): Type {
     const capitalizedType: string = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
    return Type[capitalizedType];
  }
}
