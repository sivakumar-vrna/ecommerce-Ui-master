import { Component, OnInit } from '@angular/core';
import { themeService,THEME_KEY} from 'src/app/shared/services/theme/theme.service';
import { isPlatform, ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';


export interface ProfileMenu {
  title: string,
  url: string,
  icon: string
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  currentTheme: boolean;
  public isMobile: boolean = false;


  profileMenus: ProfileMenu[] = [
    { title: 'My Account', url: '/account', icon: 'person-outline' },
    { title: 'Orders', url: '/account/orders', icon: 'archive-outline' },
    { title: 'Wishlist', url: '/account/wishlist', icon: 'heart-outline' },
  ];
  constructor(
    private router:Router,
    private theme: themeService,
    public  modalController: ModalController,
    ){
    if (isPlatform('capacitor')) {
      this.isMobile = true;
    }
    this.getCurrentTheme();
  }

  ngOnInit() {}
  
  async getCurrentTheme() {
    const theme: any = await Storage.get({ key: THEME_KEY });
    if (theme.value === 'dark') {
      this.currentTheme = true;  
    } else {
      this.currentTheme = false;
    }
  }
  
  onThemeChange(e: any) {
    console.log('THeme', this.currentTheme);
    if (e.detail.checked) {
      this.theme.onTheme('light');
    } else {
      this.theme.onTheme('dark');
    }
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
