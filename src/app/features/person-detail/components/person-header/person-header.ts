import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-header.html',
  styleUrl: './person-header.scss',
})
export class PersonHeaderComponent {
  @Input() personName: string = '';
  @Output() goBack = new EventEmitter<void>();

  onGoBack() {
    this.goBack.emit();
  }
}
