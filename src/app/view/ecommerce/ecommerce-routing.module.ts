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
        path: 'cart/:id',
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
      },
      {
        path: 'wish-list',
        loadChildren: () => import('../../pages/account/wishlist/wishlist.module').then(m => m.WishlistPageModule)
      },
      {
        path:'search',
        loadChildren:() => import('../../pages/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path:'book-details/:id',
        loadChildren:() => import('../../pages/book-details/book-details.module').then(m => m.BookDetailsPageModule)
      },
      {
        path:'complete',
        loadChildren:() => import('../../pages/complete/complete.module').then(m => m.CompleteModule)
      },
      {
        path:'order',
        loadChildren:() => import('../../pages/order/order.module').then(m => m.OrderModule)
      },
      {
        path:'add-card',
        loadChildren:() => import('../../pages/add-card/add-card.module').then(m => m.AddCardModule)
      },
      {
        path:'address',
        loadChildren:() => import('../../pages/address/address.module').then(m => m.AddressModule)
      },
      {
        path:'author',
        loadChildren:() => import('../../pages/author/author.module').then(m => m.AuthorModule)
      },
      {
        path:'author-details',
        loadChildren:() => import('../../pages/author-details/author-details.module').then(m => m.AuthorDetailsModule)
      },
      {
        path:'save-card',
        loadChildren:() => import('../../pages/save-card/save-card.module').then(m => m.SaveCardModule)
      },
      {
        path:'best-seller',
        loadChildren:() => import('../../pages/best-seller/best-seller.module').then(m => m.BestSellerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommercePageRoutingModule { }
