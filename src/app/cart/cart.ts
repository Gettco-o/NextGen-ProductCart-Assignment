import { Component, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { productService } from '../services/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-cart',
  imports: [ProductCard],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  productService = inject(productService);

  cart = signal<Product[]>([]);

  ngOnInit() {
    this.cart = this.productService.getCart();
  }
}
