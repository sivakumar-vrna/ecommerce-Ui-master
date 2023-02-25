import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  cartitems:any;
  cartData = new Subject();


  constructor(
    private orchService:OrchestrationService,
    private errorService:ErrorService
  ) { }

  ngOnInit() {
    this.getAllCartItems()
  }




  
async getAllCartItems() {
  (await this.orchService.getWishList()).subscribe(
      (res: any) => {
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
              const tempData = res.data;
              this.cartitems= res.data;
              console.log("cartitems");
              console.log(this. cartitems);
              this.cartData.next(this.orchService.orchestrateData(tempData));
              console.log(this.cartData)

            
          } else {
              this.errorService.onError(res);
          }
      },
      (err) => {
          this.errorService.onError(err);
      }
  );
}


}
