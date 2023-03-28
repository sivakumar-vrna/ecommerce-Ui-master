import { Component, OnInit,Input } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { Book } from 'src/app/shared/models/book.model';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  @Input() data: Book;
  OrderDtls: Book[];
  orderData = new Subject();
  public orderitems: any[] = [];
  orders: any[] = [];



  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService
    ) {}

  
  ngOnInit() {
    this.GetOrderDetails();
   }

  async GetOrderDetails()  {
    (await this.orchService.getOrderDetails()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.orders = res.data;
          console.log(this.orders)
          
        } 
        else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }
}



