import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { StateService } from '../services/state-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  state = inject(StateService);

  cart$ = this.state.cart$;

}
