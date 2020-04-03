import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDraftComponent } from './views/pokemon-draft/pokemon-draft.component';
import { PokemonBattleComponent } from './views/pokemon-battle/pokemon-battle.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';


const routes: Routes = [
  { path: '', component: PokemonBattleComponent },
  { path: 'battle/:myPokemon/:enemyPokemon', component: PokemonBattleComponent },
  { path: 'create', component: PokemonFormComponent },
  { path: 'jesappelleroute', component: PokemonDraftComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
