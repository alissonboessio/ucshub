import { Component, Input, input } from '@angular/core';
import { IconCardInterface } from './IconCardInterface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'icon-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './IconCard.component.html',
  styleUrl: './IconCard.component.scss'
})
export class IconCardComponent {
  

  @Input() topContent: IconCardInterface | null = null;
  @Input() bottomContent: IconCardInterface | null = null;

  @Input() IconName: string | null = null;

  @Input() width: string | null = null;
  @Input() height: string | null = null;

  
}
