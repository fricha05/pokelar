import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';
import { Attack, Nature } from '../models/attack.model';
import { PokemonAdapterService } from './pokemon-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  public static API_URL: string = "https://pokeapi.co/api/v2/pokemon/";

  public static availablePokemons = {
    héricendre: "cyndaquil",
    laporeille: "buneary",
    mewtwo: "mewtwo",
    motisma: "rotom",
    nidoran: "nidoran-f",
    pikachu: "pikachu",
    quenotor: "bidoof",
    qulbutoke: "wobbuffet",
    rattata: "rattata",
    rayquaza: "rayquaza",
    roucool: "pidgey",
    sorboul: "vanillish",
  }

  public static availableMoves = {
    charge: "tackle"
  }

  constructor(private http: HttpClient) { }

  public getPokemonByName(pokemonNameFr: string): Observable<Pokemon> {
    const url: string = PokeApiService.API_URL + PokeApiService.translateName(pokemonNameFr.toLowerCase());
    return this.http.get(url)
      .pipe(map((res: Response) => PokemonAdapterService.mapPokemon(pokemonNameFr, res)));
  }

  public getAllAvailablePokemon(): Observable<Pokemon[]> {
    let arrayObservablePkm: Array<Observable<Pokemon>> = [];

    for (const pkm in PokeApiService.availablePokemons) {
      if (PokeApiService.availablePokemons.hasOwnProperty(pkm)) {
        arrayObservablePkm.push(this.getPokemonByName(pkm));
      }
    }
    return forkJoin(arrayObservablePkm);
  }

  public static translateName(nameFr: string) {
    return PokeApiService.availablePokemons[nameFr];
  }
}
