import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StadiumComponent } from './stadium/stadium.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonStatusBarComponent } from './pokemon-status-bar/pokemon-status-bar.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

import { BattleLogService } from './services/battle-log.service';

@NgModule({
  declarations: [
    AppComponent,
    StadiumComponent,
    PokemonComponent,
    BattleLogComponent,
    PokemonStatusBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BattleLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
