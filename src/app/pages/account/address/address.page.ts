import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NavController } from '@ionic/angular';




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

  userId: string;
  addressId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  email: string;
  addressType: string;
  address1: string;
  address2: string;
  area: string;
  state: string;
  country: string;
  zipcode: string;
  date: string;
  status: string;
  toast: any;



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
    // this.activatedRoute.params.subscribe(params => {
    //   const addressStr = params['address'];
    //   if (addressStr) {
    //     this.address = JSON.parse(decodeURIComponent(addressStr));
    //   } else {
    //     this.address = {};
    //   }
    // });

    this.route.params.subscribe((params) => {
      this.address = params['address'];
    });
    this.activatedRoute.params.subscribe(params => {
      const addressStr = params['address'];

      if (addressStr) {
        const address = JSON.parse(decodeURIComponent(addressStr));
        // this.userId = address.userId;
        this.addressId = address.addressId;
        this.firstName = address.firstName;
        this.middleName = address.middleName;
        this.lastName = address.lastName;
        this.mobile = address.mobile;
        this.email = address.email;
        this.addressType = address.addressType;
        this.address1 = address.address1;
        this.address2 = address.address2;
        this.area = address.area;
        this.state = address.state;
        this.country = address.country;
        this.zipcode = address.zipcode;
        this.date = address.date;
        this.status = address.status;
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

  goToAddressPage(address: any) {
    const addressStr = encodeURIComponent(JSON.stringify(address));
    this.router.navigate(['/address', { address: addressStr }]);
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
  
  editAddress(address: any) {
    const addressStr = encodeURIComponent(JSON.stringify(address));
    this.router.navigate(['/address', { address: addressStr }]);
    console.log(addressStr);
  }

   
 addNewAddress() {
  if (this.addressData.length < 10) {
    
  } else {
    this.toast.onWaring('You have already added the maximum number of addresses');
  }
}

}