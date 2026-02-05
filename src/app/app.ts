import { Component, inject, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { ProductCard } from "./product-card/product-card";
import { Product } from './interfaces/product';
import { productService } from './services/product';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { StateService } from './services/state-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  private productService = inject(productService);
  state = inject(StateService);

  cart = this.state.cart$

  onSearch(query: string) {
    this.productService.filterProducts(query);
  }
  
}
