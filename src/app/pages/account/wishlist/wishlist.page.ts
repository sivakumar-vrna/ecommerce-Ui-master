import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  cartitems:any;
  watchitems:any;
  cartData = new Subject();
  wishData =new Subject();
  book: Book;
  bookId: number;


  constructor(
    private orchService:OrchestrationService,
    private errorService:ErrorService,
    private UserService:UserService,
    private toast:ToastWidget
  ) { }

  ngOnInit() {
    this.getAllWishItems()
  }


  
  async getAllWishItems() {
  (await this.orchService.getWishList()).subscribe(
      async (res: any) => {
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
              const tempData = res.data;
              this.watchitems= res.data;
              console.log("wishitems");
              console.log(this. watchitems);

               
        for (const watchitem of this.watchitems) {
          const res = await (await this.orchService.getBookDetails(watchitem.bookId)).toPromise();
          console.log(res);
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
            const book = res.data;
            watchitem.cost = book.cost;
            watchitem.posterurl=book.posterurl;
            watchitem.authorName=book.authorName;
            watchitem.description= book.description;
            watchitem.duration= book.duration;
          } else {
            this.errorService.onError(res);
          }
        }
              this.wishData.next(this.orchService.orchestrateData(tempData));
              console.log(this.wishData)

            
          } else {
              this.errorService.onError(res);
          }
      },
      (err) => {
          this.errorService.onError(err);
      }
  );
}





RemoveToWishItems(watchitem:any){
  console.log("Inside { RemoveTowatchlist} book-details.page.ts----->here "+watchitem.bookId);
  this.removeToCart(watchitem);
  this.removeFromCartArray(watchitem);
}
async removeToCart(watchitem: any) {
  const data = {
    userId:await this.UserService.getUserId(),
    bookId: watchitem.bookId
  };
  (
    await this.orchService.removewatchitem(data)).subscribe(
    (res: any) => {
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this.toast.onSuccess(res.message);
        window.alert(data.bookId+'book remove successfully! ');
        
      } else {
        this.toast.onFail('Error in the request');
      }
    }, (err: any) => {
      this.toast.onFail('Network Error');
    }
  )
}

removeFromCartArray(index: number) {
  if (index !== -1) {
    this.watchitems.splice(index, 1);
  }
}

addToCart(bookId: number){
  console.log("Inside { addToCart} book-details.page.ts----->here "+this.bookId);
  this.bookId = bookId;
  this.addCourseToCart(this.book);
}

async addCourseToCart(book: any) {
  const data = {
    userId:await this.UserService.getUserId(),
    bookId: this.bookId,
    count: 1,

  };
  console.log("{this is the book id to add to cart--->> Last step}"+ data.bookId);
  (await this.orchService.addToCart(data)).subscribe(
    (res: any) => {
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this.toast.onSuccess(res.message);
        window.alert(data.bookId+'book added successfully! ');
      } else {
        this.toast.onFail('Error in the request');
      }
    }, (err: any) => {
      this.toast.onFail('Network Error');
    }
  )
}



}
