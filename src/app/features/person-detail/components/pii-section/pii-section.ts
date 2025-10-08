import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pii-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pii-section.html',
  styleUrl: './pii-section.scss',
})
export class PiiSectionComponent {
  @Input() piiEntries: Array<any> = [];
}
