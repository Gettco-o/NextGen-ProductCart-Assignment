import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchInput } from "./search-input/search-input";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SearchInput],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() cartCount: number = 0;

  searchQuery: string = '';

  getQuery(query: string) {
    this.searchQuery = query;
    console.log('Search query from Navbar:', this.searchQuery);
    this.onSearch();
  }

  @Output() search = new EventEmitter<string>();
  
  onSearch() {
    this.search.emit(this.searchQuery);
  }
  
}
