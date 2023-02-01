import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then(m => m.AddressPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule { }
