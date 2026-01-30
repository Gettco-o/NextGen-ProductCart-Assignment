import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class productService {
  private http = inject(HttpClient);

  private allProducts = signal<Product[]>([]);

  private products = new BehaviorSubject<Product[]>([]);

  private cart = signal<Product[]>([]);

  private selectedProduct = signal<Product>({} as Product);

  getAllProducts() {
    this.http.get<ProductResponse>('http://127.0.0.1:3000')
    .subscribe((response: ProductResponse) => {
      this.products.next(response.products);
      this.allProducts.set(response.products);
    });

    return this.products;
    
  }

  getProductById(id: number) {
    return this.http.get<ProductResponse>('http://127.0.0.1:3000').pipe(
      map(response => response.products.find(product => product.id === id) as Product)
    );

  }

  getCart() {
    return this.cart;
  }

  isInCart(product: Product) {
    return this.cart().some(p => p.id === product.id);
  }

  updateCart(product: Product) {
    if (this.isInCart(product)) {
      this.cart.update(currentCart => currentCart.filter(p => p.id !== product.id));
    } else {    
      this.cart.update(currentCart => [...currentCart, product]);
    }
  }

  filterProducts(query:string) {
    this.products.next(this.allProducts());
    this.products.next(this.products.value.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    ));

  }
}
