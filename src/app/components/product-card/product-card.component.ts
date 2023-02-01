import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() data: Book;
  constructor() { 

  }

  ngOnInit() { }

}
