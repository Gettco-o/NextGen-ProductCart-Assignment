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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class productService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private allProducts = signal<Product[]>([]);

  private errorHandler = inject(ErrorHandlerService);

  private state = inject(StateService);

  getAllProducts() {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http.get<any>(this.baseUrl+`/products`)
    .pipe(
      catchError(err => this.errorHandler.handleError(err))
    )
    .subscribe({
      next: response => {
        this.state.setProducts(response.data);
        this.state.setLoading(false);
        this.allProducts.set(response.data);
      },
      error: () => {
        this.state.setLoading(false);
      }
    });

    
  }

  getProductById(id: string) {
    this.state.setLoading(true);
    this.state.setError(null);
    this.http.get<any>(
      `${this.baseUrl}/products/${id}`
    )
    .pipe(catchError(err => this.errorHandler.handleError(err)))
    .subscribe({
      next: prod => {
        this.state.setSingleProduct(prod.data);
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
      .post<Product>(this.baseUrl+`/products`, product)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  updateProduct(id: string, product: UpdateProductDto): Observable<Product> {
    return this.http
      .patch<Product>(`${this.baseUrl}/products/${id}`, product)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/products/${id}`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }


  getAllCategories() {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http.get<any>(`${this.baseUrl}/categories`)
    .pipe(
      catchError(err => this.errorHandler.handleError(err))
    )
    .subscribe({
      next: response => {
        this.state.setCategories(response.data);
        this.state.setLoading(false);
      },
      error: () => {
        this.state.setLoading(false);
      }
    });

    
  }
}
