import { Routes } from '@angular/router';
import { authGuard, redirectAuthenticatedGuard } from './guards/auth-guard';

export const routes: Routes = [
      {path: '', loadComponent: () => import('./login/login').then(m => m.Login), canActivate: [redirectAuthenticatedGuard]},
      {path: 'products', loadComponent: () => import('./all-products/all-products').then(m => m.AllProducts), canActivate: [authGuard]},
      {path: 'products/:id', loadComponent: () => import('./single-product/single-product').then(m => m.SingleProduct), canActivate: [authGuard]},
      {path: 'cart', loadComponent: () => import('./cart/cart').then(m => m.Cart), canActivate: [authGuard]},
      {path: 'product/new', loadComponent: () => import('./new-product/new-product').then(m => m.NewProduct), canActivate: [authGuard]},
      {path: '**', loadComponent: () => import('./notfound/notfound').then(m => m.Notfound)}
];
