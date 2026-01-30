import { Routes } from '@angular/router';
import { AllProducts } from './all-products/all-products';
import { SingleProduct } from './single-product/single-product';
import { Cart } from './cart/cart';
import { Notfound } from './notfound/notfound';
import { NewProduct } from './new-product/new-product';

export const routes: Routes = [
      {path: '', component: AllProducts},
      {path: 'products/:id', component: SingleProduct},
      {path: 'cart', component: Cart},
      {path: 'product/new', component: NewProduct},
      {path: '**', component: Notfound}
];

