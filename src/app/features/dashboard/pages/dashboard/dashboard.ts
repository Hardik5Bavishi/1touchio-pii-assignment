import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PiiService } from '../../../../core/services/pii.service';
import {
  ControlSectionComponent,
  DataTableComponent,
  StatsGridComponent,
} from '../../components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    StatsGridComponent,
    ControlSectionComponent,
    DataTableComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  piiService = inject(PiiService);
  searchQuery = signal<string>('');
  selectedPiiTypes = signal<string[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.piiService.loadPersons();
  }

  filteredPersons = computed(() => {
    let persons = this.piiService.persons$();
    // Apply search filter (passing persons data for nested/doubled filtering)
    if (this.searchQuery().trim()) {
      persons = this.piiService.searchPersons(this.searchQuery(), persons);
    }

    // Apply PII type filter (passing persons data for nested/doubled filtering)
    if (this.selectedPiiTypes().length > 0) {
      persons = this.piiService.filterPersonsByPiiTypes(
        this.selectedPiiTypes(),
        persons
      );
    }

    return persons;
  });

  onResetFilters() {
    this.searchQuery.set('');
    this.selectedPiiTypes.set([]);
  }
}
