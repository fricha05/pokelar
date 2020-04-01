import { Component, OnInit, Input } from '@angular/core';
import { BattleLogService } from '../services/battle-log.service';
import { TypeMessage } from '../models/message-log.model';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent implements OnInit {

  constructor(public battleLogService: BattleLogService) { }

  ngOnInit(): void {
  }

}
