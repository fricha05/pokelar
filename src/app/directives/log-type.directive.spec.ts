import { LogTypeDirective } from './log-type.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2, Component } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component';


describe('LogTypeDirective', () => {
  let fixture;
  let renderer2: Renderer2;

  const elRefMock = {
    nativeElement: document.createElement('div')
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LogTypeDirective, PokemonComponent],
      providers: [ Renderer2 ]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    renderer2 = fixture.debugElement.injector.get(Renderer2);
  })

  it('should create an instance', () => {
    const directive: LogTypeDirective = new LogTypeDirective(elRefMock, renderer2);
    expect(directive).toBeTruthy();
  });
});
