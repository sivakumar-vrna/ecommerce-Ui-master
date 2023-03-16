import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-latest-books',
  templateUrl: './latest-books.component.html',
  styleUrls: ['./latest-books.component.scss'],
})
export class LatestBooksComponent implements OnInit {
  latest: Book[];

  constructor(
    private orchService: OrchestrationService,
    private errorService: ErrorService,

  ) { }

  ngOnInit() {
    this.onGetLatest();

  }

  async onGetLatest() {
    (await this.orchService.getLatest()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.latest = res.data;
          console.log(this.latest)
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
