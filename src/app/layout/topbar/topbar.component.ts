import { Component, OnInit } from '@angular/core';

export interface ProfileMenu {
  title: string,
  url: string,
  icon: string
}
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  profileMenus: ProfileMenu[] = [
    { title: 'My Account', url: '/account', icon: 'person-outline' },
    { title: 'Orders', url: '/account/orders', icon: 'archive-outline' },
    { title: 'Wishlist', url: '/account/wishlist', icon: 'heart-outline' },
  ];
  constructor() { }

  ngOnInit() { }

}
