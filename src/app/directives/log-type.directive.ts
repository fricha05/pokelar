import { Directive, Renderer2, ElementRef, Input, OnInit } from '@angular/core';
import { TypeMessage, MessageLog } from '../models/message-log.model';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appLogType]'
})
export class LogTypeDirective implements OnInit {
  @Input() message: MessageLog;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) { }

  ngOnInit(): void {
    switch (this.message.type) {
      case TypeMessage.IMPORTANT:
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
        break;
      case TypeMessage.MY_PKMN:
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'blue');
        break;
      case TypeMessage.ENEMY_PKMN:
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'deeppink');
        break;
      case TypeMessage.INFO:
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
        break;
      default:
        break;
    }
  }

}
