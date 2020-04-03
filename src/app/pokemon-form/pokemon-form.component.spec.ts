import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormComponent } from './pokemon-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeApiService } from '../services/poke-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonFormComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [ 
        PokeApiService, DecimalPipe, 
        { provide: Router, useValue: {}} 
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
