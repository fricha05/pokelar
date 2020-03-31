import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatusBarComponent } from './pokemon-status-bar.component';

describe('PokemonStatusBarComponent', () => {
  let component: PokemonStatusBarComponent;
  let fixture: ComponentFixture<PokemonStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
