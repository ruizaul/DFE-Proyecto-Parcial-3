import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-summary',
  templateUrl: './search-summary.component.html',
})
export class SearchSummaryComponent {
  @Input() results: any[] = [];
  @Output() searchChange = new EventEmitter<string>();

  searchTerm: string = '';
  filteredResults: any[] = [];

  onSearch() {
    // Filtrar los resultados según el término de búsqueda
    this.filteredResults = this.results.filter((result) =>
      result.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Emitir el término de búsqueda para que otros componentes puedan reaccionar
    this.searchChange.emit(this.searchTerm);
  }
}
