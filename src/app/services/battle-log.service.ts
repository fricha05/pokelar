import { Injectable } from '@angular/core';

import { MessageLog, TypeMessage } from '../models/message-log.model'

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {
  messages: Array<MessageLog> = [];

  constructor() { }

  add(content: string, type?: TypeMessage): void {
    let message: MessageLog = {
      content,
      type
    }
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  isImportant(message: MessageLog): boolean {
    return message.type === TypeMessage.IMPORTANT;
  }
}
