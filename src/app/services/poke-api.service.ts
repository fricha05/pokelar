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

  public static availablePokemons = {
    mewtwo: "mewtwo",
    motisma: "rotom",
    nidoran: "nidoran-f",
    pikachu: "pikachu",
    quenotor: "bidoof",
    rattata: "rattata",
    rayquaza: "rayquaza",
    roucool: "pidgey",
    sorboul: "vanillish",
  }

  constructor(private http: HttpClient) { }

  private static mapPokemon(name: string, json): Pokemon {
    return new Pokemon(
      name.substring(0, 1).toUpperCase() + name.substring(1),
      this.convertType(json["types"][0].type.name),
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
  
  public getPokemonByName(pokemonNameFr: string): Observable<Pokemon> {
    const url: string = PokeApiService.API_URL + PokeApiService.translateName(pokemonNameFr);
    return this.http.get(url)
      .pipe(map((res: Response) => PokeApiService.mapPokemon(pokemonNameFr, res)));
  }

  public static translateName(nameFr: string) {
    return PokeApiService.availablePokemons[nameFr];
  }

  // Convert String to enum Type
  public static convertType(type: string): Type {
     const capitalizedType: string = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
    return Type[capitalizedType];
  }
}
