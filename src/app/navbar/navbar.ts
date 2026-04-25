import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchInput } from "./search-input/search-input";
import { Auth } from '../services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SearchInput, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private authService = inject(Auth);

  isauthenticated$ = this.authService.isAuthenticated$;


  @Input() cartCount!: number;

  searchQuery: string = '';

  getQuery(query: string) {
    this.searchQuery = query;
    this.onSearch();
  }

  @Output() search = new EventEmitter<string>();
  
  onSearch() {
    this.search.emit(this.searchQuery);
  }

  logout() {
    this.authService.logout();
  }
  
}
