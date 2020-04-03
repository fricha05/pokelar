import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() fromBack: boolean = false;
  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
 