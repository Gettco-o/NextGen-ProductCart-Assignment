import { Component, inject} from '@angular/core';
import { ProductCard } from "../product-card/product-card";
import { productService } from '../services/product';
import { Product } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state-service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-single-product',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct {
  private productService = inject(productService);
  private route = inject(ActivatedRoute);
  state = inject(StateService); 
  product$ = this.state.singleProduct$;
  loading$ = this.state.loading$;
  error$ = this.state.error$;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProduct(productId);
    });
  }

  getProduct(id: string) {
    this.productService.getProductById(id);
  }

  setSelected(product: Product) {
    this.state.toggleCartItem(product);
  }
}
