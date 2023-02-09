import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  book: Book;

  constructor() { }

  ngOnInit() {
  }

}
