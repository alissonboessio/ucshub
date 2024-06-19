import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cancel-confirm',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule],
  templateUrl: './cancel-confirm.component.html',
  styleUrl: './cancel-confirm.component.scss'
})
export class CancelConfirmComponent {

  @Input() confirmLabel: string = 'Confirmar'
  @Input() cancelLabel: string = 'Cancelar'
  @Output() confirmClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void { }

  cancel() {
    this.cancelClick.emit(true);
  }

  confirm() {
    this.confirmClick.emit(true);
  }
}
