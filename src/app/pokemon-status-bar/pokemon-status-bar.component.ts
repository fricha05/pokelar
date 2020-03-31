import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-status-bar',
  templateUrl: './pokemon-status-bar.component.html',
  styleUrls: ['./pokemon-status-bar.component.css']
})
export class PokemonStatusBarComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
