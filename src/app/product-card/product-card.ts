import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})


export class ProductCard {

  @Input() product!: Product;
  @Input() selectState: boolean = false;
  @Input() showCartBtn: boolean = false;

  @Output() activeProduct = new EventEmitter<Product>();

  onSelect() {
    this.activeProduct.emit(this.product);
  }

}
