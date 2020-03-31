import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() fromBack: boolean = false;
  @Input() pokemonName: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
