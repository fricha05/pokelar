import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {
  messages: Array<string> = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message)
  }
}
