import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommercePage } from './ecommerce.page';

const routes: Routes = [
  {
    path: '',
    component: EcommercePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../../pages/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../../pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      {
        path: 'product/:id',
        loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductPageModule)
      },
      {
        path: 'all-books',
        loadChildren: () => import('../../pages/all-books/all-books.module').then(m => m.AllBooksPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../../pages/account/account.module').then(m => m.AccountPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommercePageRoutingModule { }
