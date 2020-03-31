import { Component, OnInit, Input } from '@angular/core';
import { BattleLogService } from '../services/battle-log.service';

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
