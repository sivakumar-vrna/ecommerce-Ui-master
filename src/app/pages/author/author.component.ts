import { Component, OnInit, SimpleChanges } from '@angular/core';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoadingController } from '@ionic/angular';
  





@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  searchText: string;
  public author : any[] = [];
  filteredAuthors: any[] = []; 


  constructor(
    private orchService:OrchestrationService,
    private errorService:ErrorService,
    private loadingCtrl: LoadingController,

  ) { }

  ngOnInit() {
    this.onGetAllAuthor();
    this.filteredAuthors = this.author;
  }
 

  onToggle(authors: any): void {
    const toggle = event.target as HTMLElement;
    const card = toggle.closest('.card') as HTMLElement;
    const contact = card.querySelector('.contact') as HTMLElement;
  
    card.classList.toggle('active');
    contact.classList.toggle('expanded');
  }
  async onGetAllAuthor(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    (await this.orchService.getAllAuthor()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.author = res.data;
          console.log(this.author)
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
 

  filterAuthors() {
    this.filteredAuthors = this.author.filter((author) =>
      author.authorname.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText']) {
      this.filterAuthors();
    }
  }
  



}
