import { AfterViewInit, Component, OnInit, ViewChild,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { environment } from 'src/environments/environment';
import { GENRES_KEY } from 'src/app/shared/services/ui-orchestration/orch.service';
import { BookDetailsService } from '../book-details/book-details.service';
import { Book } from 'src/app/shared/models/book.model';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import  SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';

SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {
  // @Input() data: Book;
  book: Book;
  searchResult: any;
  searchKey: string;
  searchSuggest: any;
  // isLoading = false;
  domainUrl: string;
  genres: any;
  bookId:any;
  books:Book;
  bookDtls: Book[];
  bookid:any;
  isLoading: boolean = false;

  

 
  @ViewChild('search') search: any;

  constructor(
    private searchService: SearchService,
    public  loadingController: LoadingController,
    private route: ActivatedRoute,
    public  modalController: ModalController,
    private toast: ToastWidget,
    private BookDetailsService:BookDetailsService,
    private orchService:OrchestrationService,
    private errorService:ErrorService
  ) {
    if (isPlatform('capacitor')) {
      this.domainUrl = environment.capaciorUrl;
    } else {
      this.domainUrl = window.location.origin;
    }
    this.triggerHomeData();
    this.route.queryParams.subscribe((params) => {
      const bookId = params['id'];
      if (bookId) {
        this.BookDetailsService.bookDetailsModal(bookId);
      }
    });
  }

  triggerHomeData() {
    
  }
  async ngOnInit() {
    if (isPlatform('capacitor')) {
      this.domainUrl = environment.capaciorUrl;
    } else {
      this.domainUrl = window.location.origin;
    }
    const tempData = await Storage.get({ key: GENRES_KEY });
    this.genres = JSON.parse(tempData.value);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }

  fromSearchBar(e: any) {
    const searchKey = e.detail?.value;
    this.onSearch(searchKey);
  }
  async onSearch(search: any) {
    this.searchKey = search;
    this.isLoading = true;
    const loading = await this.loadingController.create({
      cssClass: 'search-page-loader',
      message: 'Please wait...',
    });
    await loading.present(); // Show the loading indicator
  
    if (search && search?.length > 0) {
      (await this.searchService.onSearch(this.searchKey)).subscribe(
        async (res: any) => {
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
            this.searchResult = res.data;
            // Check if this.book is defined and not null before accessing its posterurl property
            if (this.book) {
              this.searchResult.map(result => result['posterurl'] = this.domainUrl + '/images' + this.book.posterurl);
            }
          } else {
            this.toast.onFail('Error');
          }
          await loading.dismiss(); // Dismiss the loading indicator
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.toast.onFail('Network error');
        });
    } else {
      await loading.dismiss(); // Dismiss the loading indicator
      this.searchKey = null;
      this.searchResult = null;
    }
  }
  
  async onSearchSuggest(e: any) {
    const searchKey = e.detail?.value;
    if (searchKey && searchKey?.length > 0) {
      (await this.searchService.onSearchSuggest(searchKey)).subscribe(
        res => {
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
            this.searchSuggest = res.data;


          } else {
            this.toast.onFail('Error');
          }
        },
        (err: any) => {
          this.toast.onFail('Network error');
        });
    } else {
      this.searchSuggest = null;
    }
  }



  
  

}
