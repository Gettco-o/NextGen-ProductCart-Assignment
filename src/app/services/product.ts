import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '../interfaces/product';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler';
import { StateService } from './state-service';

@Injectable({
  providedIn: 'root',
})
export class productService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://127.0.0.1:3000/api/v1/products';

  private allProducts = signal<Product[]>([]);

  private errorHandler = inject(ErrorHandlerService);

  private state = inject(StateService);

  getAllProducts() {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http.get<unknown>(this.baseUrl)
    .pipe(
      catchError(err => this.errorHandler.handleError(err))
    )
    .subscribe({
      next: response => {
        const prods = this.extractProducts(response);
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
      `${this.baseUrl}/${id}`
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

  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http
      .post<Product>(this.baseUrl, product)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  updateProduct(id: string, product: UpdateProductDto): Observable<Product> {
    return this.http
      .patch<Product>(`${this.baseUrl}/${id}`, product)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  private extractProducts(response: unknown): Product[] {
    if (Array.isArray(response)) {
      return response as Product[];
    }

    if (response && typeof response === 'object') {
      const candidate = response as { products?: unknown; data?: unknown };

      if (Array.isArray(candidate.products)) {
        return candidate.products as Product[];
      }

      if (Array.isArray(candidate.data)) {
        return candidate.data as Product[];
      }
    }

    return [];
  }
}
