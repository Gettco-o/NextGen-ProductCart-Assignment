import { Routes } from '@angular/router';
import { AllProducts } from './all-products/all-products';
import { SingleProduct } from './single-product/single-product';
import { Cart } from './cart/cart';
import { Notfound } from './notfound/notfound';
import { NewProduct } from './new-product/new-product';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
      {path: '', component: Login},
      {path: 'products', component: AllProducts, canActivate: [authGuard]},
      {path: 'products/:id', component: SingleProduct, canActivate: [authGuard]},
      {path: 'cart', component: Cart, canActivate: [authGuard]},
      {path: 'product/new', component: NewProduct, canActivate: [authGuard]},
      {path: '**', component: Notfound}
];

