import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class StateService {

  private _products$ = new BehaviorSubject<Product[]>([]);
  private _singleProduct$ = new BehaviorSubject<Product>({} as Product)
  private _cart$ = new BehaviorSubject<Product[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<string | null>(null);

  readonly products$ = this._products$.asObservable();
  readonly singleProduct$ = this._singleProduct$.asObservable();
  readonly cart$ = this._cart$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly error$ = this._error$.asObservable();

  readonly cartCount$ = this.cart$.pipe(map(cart => cart.length));

  setProducts(products: Product[] | null | undefined): void {
    this._products$.next(Array.isArray(products) ? [...products] : []);
  }

  setSingleProduct(product: Product): void {
    this._singleProduct$.next(product);
  } 

  addProduct(product: Product): void {
    this._products$.next([...this._products$.value, product]);
  }

  updateProduct(product: Product): void {
    this._products$.next(
      this._products$.value.map(p => (p.id === product.id ? { ...p, ...product } : p))
    );
  }

  setLoading(isLoading: boolean): void {
    this._loading$.next(isLoading);
  }

  setError(msg: string | null) {
    this._error$.next(msg);
  }

  addToCart(product: Product): void {
    this._cart$.next([...this._cart$.value, product]);
  }

  removeFromCart(productId: number): void {
    this._cart$.next(this._cart$.value.filter(p => p.id !== productId));
  }

  clearCart(): void {
    this._cart$.next([]);
  }

  isInCart(product: Product) {
    return this._cart$.value.some(p => p.id === product.id);
  }

  toggleCartItem(product: Product): void {
    if (this.isInCart(product)) {
      this.removeFromCart(product.id);
    } else {
      this.addToCart(product);
    }
  }
}
