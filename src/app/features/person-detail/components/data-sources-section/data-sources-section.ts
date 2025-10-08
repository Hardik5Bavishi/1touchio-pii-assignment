import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-sources-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-sources-section.html',
  styleUrl: './data-sources-section.scss',
})
export class DataSourcesSectionComponent {
  @Input() dataSources: {
    documents: string[];
    databases: string[];
    emails: string[];
    chats: string[];
  } = {
    documents: [],
    databases: [],
    emails: [],
    chats: [],
  };
}
