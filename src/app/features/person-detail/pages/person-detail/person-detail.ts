import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { PiiService } from '../../../../core/services/pii.service';
import { Person } from '../../../../core/models/pii.model';
import {
  PersonHeaderComponent,
  PiiSectionComponent,
  DataSourcesSectionComponent,
} from '../../components';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    PersonHeaderComponent,
    PiiSectionComponent,
    DataSourcesSectionComponent,
  ],
  templateUrl: './person-detail.html',
  styleUrl: './person-detail.scss',
})
export class PersonDetail implements OnInit {
  route = inject(ActivatedRoute);
  piiService = inject(PiiService);
  personId = signal<number | null>(null);
  person = computed<Person | undefined>(() => {
    const id = this.personId();
    return id ? this.piiService.getPersonById(id) : undefined;
  });

  piiEntries = computed(() => {
    const person = this.person();
    if (!person) return [];
    return Object.entries(person.pii);
  });

  ngOnInit() {
    // Load data first if not already loaded
    if (this.piiService.persons$().length === 0) {
      this.piiService.loadPersons();
    }

    this.route.params.subscribe((params) => {
      const id = parseInt(params['id'], 10);
      this.personId.set(id);
    });
  }

  onGoBack() {
    window.history.back();
  }
}
