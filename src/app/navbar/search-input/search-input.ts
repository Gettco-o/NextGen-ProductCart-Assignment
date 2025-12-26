import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
      this.search.emit(this.searchQuery);
  }
}
