import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  public loadingSpinner: boolean = false

  @Input() set loading(load: boolean) {
    this.setLoading(load)
  }

  @Input() diameter: number = 30

  constructor() { }

  private setLoading(load: boolean) {
    this.loadingSpinner = load
  }
}
