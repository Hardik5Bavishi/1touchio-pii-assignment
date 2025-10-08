import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, DashboardStats } from '../models/pii.model';

@Injectable({
  providedIn: 'root',
})
export class PiiService {
  http = inject(HttpClient);
  private persons = signal<Person[]>([]);
  private loading = signal<boolean>(false);

  readonly persons$ = this.persons.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  // Statistics
  readonly stats = computed<DashboardStats>(() => {
    const persons = this.persons();

    if (persons.length === 0) {
      return {
        totalPersons: 0,
        totalPiiItems: 0,
        averageDataSources: 0,
      };
    }

    const totalPiiItems = this.calculateTotalPiiItems(persons);
    const totalDataSources = this.calculateTotalDataSources(persons);
    const averageDataSources = totalDataSources / persons.length;

    return {
      totalPersons: persons.length,
      totalPiiItems,
      averageDataSources: Math.round(averageDataSources * 100) / 100,
    };
  });

  // Available PII types for filtering
  readonly availablePiiTypes = computed<string[]>(() => {
    const persons = this.persons();
    const piiTypes = new Set<string>();

    persons.forEach((person) => {
      Object.keys(person.pii).forEach((type) => {
        if (person.pii[type].length > 0) {
          piiTypes.add(type);
        }
      });
    });

    return Array.from(piiTypes).sort();
  });

  loadPersons(): void {
    this.loading.set(true);
    this.http.get<Person[]>('/assets/piis.json').subscribe({
      next: (data) => this.persons.set(data),
      error: (error) => console.error('PiiService: Error loading data:', error),
      complete: () => this.loading.set(false), // always called after success
    });
  }

  getPersonById(id: number): Person | undefined {
    return this.persons().find((person) => person.id === id);
  }

  searchPersons(query: string, filteredPersons: Person[]): Person[] {
    let persons = this.persons();
    if (filteredPersons) {
      persons = filteredPersons;
    }

    if (!query.trim()) {
      return persons;
    }

    const searchTerm = query.toLowerCase();
    return persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );
  }

  filterPersonsByPiiTypes(
    piiTypes: string[],
    filteredPersons: Person[]
  ): Person[] {
    let persons = this.persons();
    if (filteredPersons) {
      persons = filteredPersons;
    }

    if (piiTypes.length === 0) {
      return persons;
    }

    return persons.filter((person) =>
      piiTypes.some((type) => this.hasPiiType(person, type))
    );
  }

  getPiiTypesForPerson(person: Person): string[] {
    return Object.keys(person.pii).filter((key) => person.pii[key]?.length);
  }

  getDataSourcesCount(person: Person): number {
    return Object.values(person.dataSources).reduce(
      (total, sources) => total + sources.length,
      0
    );
  }

  private calculateTotalPiiItems(persons: Person[]): number {
    return persons.reduce(
      (total, person) => total + Object.values(person.pii).flat().length,
      0
    );
  }

  private calculateTotalDataSources(persons: Person[]): number {
    return persons.reduce(
      (total, person) =>
        total + Object.values(person.dataSources).flat().length,
      0
    );
  }

  private hasPiiType(person: Person, type: string): boolean {
    return person.pii[type]?.length > 0;
  }
}
