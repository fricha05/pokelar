import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StadiumComponent } from './stadium/stadium.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonStatusBarComponent } from './pokemon-status-bar/pokemon-status-bar.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { PokemonDraftComponent } from './views/pokemon-draft/pokemon-draft.component';
import { PokemonBattleComponent } from './views/pokemon-battle/pokemon-battle.component';

import { BattleLogService } from './services/battle-log.service';
import { BattleService } from './services/battle.service';
import { PokeApiService } from './services/poke-api.service';
import { PokemonAdapterService } from './services/pokemon-adapter.service';

import { LogTypeDirective } from './directives/log-type.directive';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';



@NgModule({
  declarations: [
    AppComponent,
    StadiumComponent,
    PokemonComponent,
    BattleLogComponent,
    PokemonStatusBarComponent,
    LogTypeDirective,
    PokemonDraftComponent,
    PokemonBattleComponent,
    PokemonFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BattleLogService,
    PokemonAdapterService,
    BattleService,
    PokeApiService,
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
