import { Component, Input } from '@angular/core';

@Component({
  selector: 'container-overflow',
  standalone: true,
  imports: [],
  templateUrl: './container-overflow.component.html',
  styleUrl: './container-overflow.component.scss'
})
export class ContainerOverflowComponent {

  @Input() titleIcon: string | null = null;
  @Input() title: string | null = null;
  @Input() botoesMenuSuperior!: Array<any> | null;
  @Input() disabled: boolean = false;

}
