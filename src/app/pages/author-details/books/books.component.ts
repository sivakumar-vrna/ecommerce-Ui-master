import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input() data: Book;
  // @Input()book:Book

  bookDtls: Book[];
  bookid:any;
  book: Book;


  isReadMore = true



  constructor(
    public modalController: ModalController,

  ) { }
  showText() {
    this.isReadMore = !this.isReadMore
 }

  
  ngOnInit() {}


  

}
