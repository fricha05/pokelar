import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-status-bar',
  templateUrl: './pokemon-status-bar.component.html',
  styleUrls: ['./pokemon-status-bar.component.css']
})
export class PokemonStatusBarComponent implements OnInit {
  @Input() pokemonName: string;
  @Input() pokemonLevel: number;
  @Input() pokemonHealth: number;

  constructor() { }

  ngOnInit(): void {
  }

}
