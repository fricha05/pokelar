import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDraftComponent } from './pokemon-draft.component';

describe('PokemonDraftComponent', () => {
  let component: PokemonDraftComponent;
  let fixture: ComponentFixture<PokemonDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
