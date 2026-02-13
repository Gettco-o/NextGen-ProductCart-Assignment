import { Component, inject} from '@angular/core';
import { productService } from '../services/product';
import { Product } from '../interfaces/product';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from "@angular/router";
import { StateService } from '../services/state-service';
import { AsyncPipe } from '@angular/common';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-all-products',
  imports: [ProductCard, RouterLink, AsyncPipe],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts {
  private productService = inject(productService);

  authService = inject(Auth);

  state = inject(StateService);

  products$ = this.state.products$;

  error$ = this.state.error$;

  loading$ = this.state.loading$;

  isauthenticated$ = this.authService.isAuthenticated$;

  ngOnInit() {
    this.productService.getAllProducts();
  }
  
  setSelected(product: Product) {
    this.state.toggleCartItem(product);
  }
}
