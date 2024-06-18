import { Component, input } from '@angular/core';

@Component({
  selector: 'container-center',
  standalone: true,
  imports: [],
  templateUrl: './container-center.component.html',
  styleUrl: './container-center.component.scss'
})
export class ContainerCenterComponent {
  width = input<string>("350px")
  height = input<string>("350px")

}
