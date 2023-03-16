import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-featured-books',
  templateUrl: './featured-books.component.html',
  styleUrls: ['./featured-books.component.scss'],
})
export class FeaturedBooksComponent implements OnInit {

  featured: Book[];
  constructor(
    private orchService: OrchestrationService,
    private errorService: ErrorService,

  ) { }

  ngOnInit() {
    this.onGetfeatured();

  }




  async onGetfeatured() {
    (await this.orchService.getfeatured()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.featured = res.data;
          console.log(this.featured)
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
