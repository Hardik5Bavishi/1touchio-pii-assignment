import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../stat-card/stat-card';
import { DashboardStats } from '../../../../core/models/pii.model';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './stats-grid.html',
  styleUrl: './stats-grid.scss',
})
export class StatsGridComponent {
  @Input() stats: DashboardStats | null = null;
}
