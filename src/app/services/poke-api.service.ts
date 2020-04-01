import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private API_URL: string = "";

  constructor(/*private http: HttpClient*/) { }

  /*getPokemon(): Observable<Pokemon[]> {
    return this.http
  }*/
}
