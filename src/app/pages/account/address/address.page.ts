import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { AddressPageModule } from './address.module';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AddressComponent } from '../../address/address.component';




@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})

export class AddressPage implements OnInit {
  public addressData:any;
  id: string;


  address: any;

  isLoading: boolean = false;
  selectedAddress: any;
  contentPrice: number;
  selectedCard: any;


  // address: AddressPageModule = {
  //   addressId: null,
  //   firstName: '',
  //   lastName: '',
  //   mobile: '',
  //   address1: '',
  //   address2: '',
  //   area: '',
  //   country: '',
  //   zipCode: '',
  //   addressType: '',
  // };




  constructor(
    private modalController :ModalController,
    private loadingController: LoadingController,
    private orchService: OrchestrationService,
    private errorService: ErrorService,
    private router: Router, 
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.ongetSavedAddress();
    this.activatedRoute.params.subscribe(params => {
      const addressStr = params['address'];
      if (addressStr) {
        this.address = JSON.parse(decodeURIComponent(addressStr));
      } else {
        this.address = {};
      }
    });
  }
  
  async ongetSavedAddress(){
    this.isLoading = true;
    const loading = await this.loadingController.create();
    (await this. orchService.getSavedAddress()).subscribe((res: any) => {
      console.log(res);
      const data = res.data;
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this. addressData = data;
        console.log(this. addressData);
        this.selectedAddress = this.addressData[1];
      } else {
        this.selectedAddress = 'new';
      }
      this.isLoading = false;
      loading.dismiss();
    }, (err) => {
      console.log('siva:', err); // add a console.log statement here to help diagnose the error
      this.isLoading = false;
      loading.dismiss();
    });
  }


  

  goToAddressPage(id: string) {
    this.router.navigate(['/address', id]);
  }


  async deleteAddress(address) {
     this.isLoading = true;
    const loading = await this.loadingController.create();
    (await this. orchService.deleteAddress()).subscribe((res: any) => {
      console.log(res);
      const data = res.data;
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this. addressData = data;
        console.log(this. addressData);
        this.selectedAddress = this.addressData[1];
      } else {
        this.selectedAddress = 'delete';
      }

    console.log(`Deleting address ${address.addressId}`);
  }
  
  

    )}
}
