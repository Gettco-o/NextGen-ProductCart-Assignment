import { Component, ContentChildren, QueryList, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { ProductCard } from "./product-card/product-card";
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  imports: [Navbar, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  activeProduct!: Product;

  setSelected(product: Product) {
    this.activeProduct = product;
    console.log(this.activeProduct, 'selected product');
    console.log(this.products(), 'all products');
  }

  searchQuery: string = '';

  onSearch(query: string) {
    this.searchQuery = query;
    console.log('Search query from App:', this.searchQuery);
    console.log('filtered products:', this.filteredProducts());
  }

  filteredProducts() {
    if (!this.searchQuery) {
      return this.products();
    }
    return this.products().filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  


  products = signal<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 4',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for Product 5',
      price: 59.99,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for Product 6',
      price: 69.99,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]);
}
