import { Component, DestroyRef, inject, signal} from '@angular/core';
import { productService } from '../services/product';
import { Product } from '../interfaces/product';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-all-products',
  imports: [ProductCard, RouterLink],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts {
  productService = inject(productService);

  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);

  cart = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getAllProducts()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((data) => {
      this.products.set(data);
    });

    this.cart = this.productService.getCart();
  }
  
  setSelected(product: Product) {
    this.productService.updateCart(product);
  }
}
