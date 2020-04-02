import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StadiumComponent } from './stadium/stadium.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonStatusBarComponent } from './pokemon-status-bar/pokemon-status-bar.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

import { BattleLogService } from './services/battle-log.service';
import { BattleService } from './services/battle.service';
import { PokeApiService } from './services/poke-api.service';

import { LogTypeDirective } from './directives/log-type.directive';
import { DatePipe, DecimalPipe } from '@angular/common';

import { PokemonDraftComponent } from './views/pokemon-draft/pokemon-draft.component';
import { PokemonBattleComponent } from './views/pokemon-battle/pokemon-battle.component';

@NgModule({
  declarations: [
    AppComponent,
    StadiumComponent,
    PokemonComponent,
    BattleLogComponent,
    PokemonStatusBarComponent,
    LogTypeDirective,
    PokemonDraftComponent,
    PokemonBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BattleLogService,
    BattleService,
    PokeApiService,
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
