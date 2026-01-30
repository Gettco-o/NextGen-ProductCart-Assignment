import { Component, inject, signal } from '@angular/core';
import { ProductCard } from "../product-card/product-card";
import { productService } from '../services/product';
import { Product } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-single-product',
  imports: [ProductCard],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct {
  productService = inject(productService);
  private route = inject(ActivatedRoute);
  product = signal<Product>({} as Product);
  cart = signal<Product[]>([]);

  ngOnInit() {
    console.log('SingleProduct component initialized');
    this.route.params.subscribe(params => {
      const productId = params['id'];
      console.log('YO Fetching product with ID:', productId);
      this.getProduct(productId);
    });

    this.cart = this.productService.getCart();
  }

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe((product) => {
      this.product.set(product);
    }); 
  }

  setSelected(product: Product) {
    this.productService.updateCart(product);
  }
}
