import {
  Component,
  Input,
  inject,
  ViewChild,
  AfterViewInit,
  effect,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Person } from '../../../../core/models/pii.model';
import { PiiService } from '../../../../core/services/pii.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTableComponent implements AfterViewInit {
  @Input() personsSignal!: Signal<Person[]>; // only read

  piiService = inject(PiiService);

  displayedColumns: string[] = [
    'name',
    'pii_types',
    'data_source_count',
    'actions',
  ];

  dataSource = new MatTableDataSource<Person>([]);
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor() {
    // Use effect to automatically update data source when persons input changes
    effect(() => {
      const persons = this.personsSignal();
      this.dataSource.data = persons;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getPiiTypesForPerson(person: Person): string[] {
    return this.piiService.getPiiTypesForPerson(person);
  }

  getDataSourcesCount(person: Person): number {
    return this.piiService.getDataSourcesCount(person);
  }
}
