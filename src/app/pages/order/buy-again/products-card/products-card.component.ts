import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
@Component({
  selector: 'app-product-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent implements OnInit {
  bookDtls: Book[];
  bookid:any;


  @Input() data: Book;
  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService

  ) { }

  ngOnInit() { }
  async GetBookDetails(bookId) {
    (await this.orchService.getBookDetails(bookId)).subscribe({
        next: (res: any) => {
          if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
            this.bookDtls = res.data;
            console.log("{inside GetBookDetails}"+this.bookDtls)
          } else {
            this.errorService.onError(res);
          }
        },
        error: error => {
          this.errorService.onError(error);
        }
      });
    }
}
