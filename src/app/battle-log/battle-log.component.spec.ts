import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleLogComponent } from './battle-log.component';
import { BattleLogService } from '../services/battle-log.service';
import { LogTypeDirective } from '../directives/log-type.directive';

describe('LogComponent', () => {
  let component: BattleLogComponent;
  let fixture: ComponentFixture<BattleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleLogComponent, LogTypeDirective ],
      providers: [ BattleLogService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
