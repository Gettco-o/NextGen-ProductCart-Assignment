import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler';
import { StateService } from './state-service';

@Injectable({
  providedIn: 'root',
})
export class productService {
  private http = inject(HttpClient);

  private allProducts = signal<Product[]>([]);

  private errorHandler = inject(ErrorHandlerService);

  private state = inject(StateService);

  getAllProducts() {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http.get<Product[]>('http://127.0.0.1:3000/api/v1/products')
    .pipe(
      catchError(err => this.errorHandler.handleError(err))
    )
    .subscribe({
      next: prods => {
        this.state.setProducts(prods);
        this.state.setLoading(false);
        this.allProducts.set(prods);
      },
      error: () => {
        this.state.setLoading(false);
      }
    });

    
  }

  getProductById(id: string) {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http.get<Product>(
      `http://127.0.0.1:3000/api/v1/products/${id}`
    )
    .pipe(catchError(err => this.errorHandler.handleError(err)))
    .subscribe({
      next: prod => {
        this.state.setSingleProduct(prod);
        this.state.setLoading(false);
      },
      error: () => {
        this.state.setLoading(false);
      }
    })
  }

  filterProducts(query:string) {
    this.state.setProducts(
      this.allProducts().filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
    )

  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>('http://127.0.0.1:3000/api/v1/products', product)
    .pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
