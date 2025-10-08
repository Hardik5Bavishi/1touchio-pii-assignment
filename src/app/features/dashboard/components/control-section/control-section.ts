import {
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-section.html',
  styleUrl: './control-section.scss',
})
export class ControlSectionComponent {
  // signal based input and output properties
  searchQuery = model<string>('');
  availablePiiTypes = input<string[]>([]);
  selectedPiiTypes = model<string[]>([]);

  resetFilters = output<void>();

  onSearchChange(value: string) {
    debugger;
    this.searchQuery.set(value);
  }

  onPiiTypeFilterChange(piiType: string, event: Event) {
    const target = event?.target as HTMLInputElement;
    const currentTypes = this.selectedPiiTypes();
    if (target.checked) {
      this.selectedPiiTypes.set([...currentTypes, piiType]);
    } else {
      this.selectedPiiTypes.set(
        currentTypes.filter((type) => type !== piiType)
      );
    }
  }

  onResetFilters() {
    this.resetFilters.emit();
  }
}
