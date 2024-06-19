import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'outline-button',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule, 
  MatIcon],
  templateUrl: './outline-button.component.html',
  styleUrl: './outline-button.component.scss'
})
export class OutlineButtonComponent {

  @Input() label: string = 'Adicionar'
  @Input() iconName: string = 'add'
  @Input() disabled: boolean = false
  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void { }

  confirm() {    
    this.onClick.emit(true);
  }
}
