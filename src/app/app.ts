import { Component, inject, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { ProductCard } from "./product-card/product-card";
import { Product } from './interfaces/product';
import { productService } from './services/product';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  productService = inject(productService);

  cart = signal<Product[]>([]);

  ngOnInit() {
    this.cart = this.productService.getCart();
  }

  onSearch(query: string) {
    this.productService.filterProducts(query);
  }
  
}
