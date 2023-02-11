import { Component, OnInit,Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Input() data: Book;

books:Array<{}>
  angularFirestore: any;
  userId: any;
  book:any;
  constructor(
    public NavController:NavController
  ) { 
    this.books =[
      {name:"Author: Aenean lacinia",code:1},
      {name:"Author: Aenean lacinia",code:2}
    ]
  }
  remove(no){
     (this.books).splice( no,1);
  }

  
  ngOnInit() {
  }

  deleteSpace(book: Book): void {
    console.log('book.id',book)
      this.setisDeleted(book);
  }
  
  setisDeleted(book): Promise<any> {

    const isDeleted = true;
    
    return this.angularFirestore
    .collection('accounts')
    .doc(this.userId)
    .collection("books")
    .doc(book.bookId)
    .update({ isDeleted })
  }v
    
}
