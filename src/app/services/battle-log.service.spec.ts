import { TestBed } from '@angular/core/testing';

import { BattleLogService } from './battle-log.service';

describe('BattleLogService', () => {
  let service: BattleLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have one message containing HelloWorld', () => {
    service.add('HelloWorld');
    expect(service.messages).toHaveLength(1);
    expect(service.messages).toContain('HelloWorld');
    expect(service.messages[0]).toBe('HelloWorld');
  })
});
