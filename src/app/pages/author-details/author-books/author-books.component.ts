import { Component, OnInit,Input } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.scss'],
})
export class AuthorBooksComponent implements OnInit {

  bookDtls: Book[];
  bookid:any;


  @Input() data: Book;
  constructor() { }

  ngOnInit() {}

}
