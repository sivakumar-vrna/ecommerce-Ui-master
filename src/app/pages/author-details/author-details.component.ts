import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Book } from 'src/app/shared/models/book.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoadingController } from '@ionic/angular';


SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
})
export class AuthorDetailsComponent implements OnInit {
  @Input() author: any;


  domainUrl: string;
  isReadMore = true;

  latest: Book[];




  config: SwiperOptions = {
    slidesPerView: 7,
    spaceBetween: 10,
    preloadImages: true,
    loop: true,
    // navigation: true,
    // pagination: { clickable: true },
    scrollbar: false,
    autoplay:true
  };

 @ViewChild('bookSwiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    public modalController: ModalController,
    private orchService:OrchestrationService,
    private errorService :ErrorService,
    private loadingCtrl: LoadingController

  ) { }

  showText() {
     this.isReadMore = !this.isReadMore
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'circular'
    });
    await loading.present();
  }

  ngOnInit() {
    this.onGetLatest();

  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  async onGetLatest() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
  
    (await this.orchService.getLatest()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.latest = res.data;
          console.log(this.latest)
        } else {
          this.errorService.onError(res);
        }
        loading.dismiss();
      },
  
      error: error => {
        this.errorService.onError(error);
        loading.dismiss();
      }
    });
  }
}
  






