import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, map, Observable } from 'rxjs';

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
    this.http.get<Product[]>('http://127.0.0.1:3000/products')
    .subscribe((response: Product[]) => {
      this.products.next(response);
      this.allProducts.set(response);
    });

    return this.products;
    
  }

  getProductById(id: string) {
    return this.http.get<Product>(
      `http://127.0.0.1:3000/products/${id}`
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

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>('http://127.0.0.1:3000/products', product);
  }
}
