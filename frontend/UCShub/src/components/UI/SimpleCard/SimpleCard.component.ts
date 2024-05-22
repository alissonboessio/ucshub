import { Component, Input, input } from '@angular/core';
import { SimpleCardInterface } from './SimpleCardInterface';

@Component({
  selector: 'simple-card',
  standalone: true,
  imports: [],
  templateUrl: './SimpleCard.component.html',
  styleUrl: './SimpleCard.component.scss'
})
export class SimpleCardComponent {
  

  @Input() topContent: SimpleCardInterface | null = null;
  @Input() bottomContent: SimpleCardInterface | null = null;

  @Input() width: string | null = null;
  @Input() height: string | null = null;

}
