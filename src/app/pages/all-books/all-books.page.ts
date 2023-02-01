import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.page.html',
  styleUrls: ['./all-books.page.scss'],
})
export class AllBooksPage implements OnInit {
  books: Book[];
  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.onGetBooks();
  }
  onGetBooks() {
    this.orchService.getBooks().subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.books = res.data;
          console.log(this.books)
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
