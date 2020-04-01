import { TestBed } from '@angular/core/testing';

import { BattleLogService } from './battle-log.service';
import { MessageLog, TypeMessage } from '../models/message-log.model'

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
    expect(service.messages[0].content).toBe('HelloWorld');
  })

  it('should clear the messages array', () => {
    service.add('HelloWorld');
    service.clear();
    expect(service.messages).toHaveLength(0);
  })

  it('should determine if message it important', () => {
    const message: MessageLog = {
      content: 'This message is important',
      type: TypeMessage.IMPORTANT
    }

    expect(service.isImportant(message)).toBeTruthy();
  })
});
