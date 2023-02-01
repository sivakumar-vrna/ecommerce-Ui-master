import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  movieId: number;
  routeSub: Subscription;
  book: Book;
  constructor(
    private route: ActivatedRoute,
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.movieId = params['id']; // Movie id is captured here
    });
  }

  ngOnInit() {
    console.log(this.movieId)
    this.onProductDetails();
  }
  onProductDetails() {
    this.orchService.getBooks().subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.book = res.data.find((e: Book) => e.bookId == this.movieId);
          console.log(this.book)
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
