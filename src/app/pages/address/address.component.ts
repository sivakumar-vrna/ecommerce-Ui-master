import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  isSubmitted = false;
  isEditMode: boolean = false;
  newAddressForm: FormGroup;

  address: any; 


  
  constructor(
    private fb: FormBuilder,
    private addressService: OrchestrationService,
    private  toast: ToastWidget,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private userService:UserService
    ){}
  ngOnInit() {
    this.newAddressForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      mobile: ['', Validators.required],
      email:['',Validators.required],
      address1: ['', Validators.required],
      address2: ['',Validators.required],
      addressType:['',Validators.required],
      area:['',Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      
    });
    this.onSubmit();
  }

  async onSubmit() {
    
    this.isSubmitted = true;
    const postData = {
      firstName: this.newAddressForm.get('firstName').value,
      lastName: this.newAddressForm.get('lastName').value,
      middleName: this.newAddressForm.get('middleName').value,
      mobile: this.newAddressForm.get('mobile').value,
      email:this.newAddressForm.get('email').value,
      address1: this.newAddressForm.get('address1').value,
      address2: this.newAddressForm.get('address2').value,
      addressType:this.newAddressForm.get('addressType').value,
      area:this.newAddressForm.get('area').value,
      country: this.newAddressForm.get('country').value,
      state: this.newAddressForm.get('state').value,
      zipCode: this.newAddressForm.get('zipCode').value,
      userId : await this.userService.getUserId()
      

    };
    console.log(postData);
    if (this.newAddressForm.invalid) {
      this.toast.onWaring('Please fill all required fields.');
      return;
    }
    if (this.newAddressForm.valid) {

    (await this.addressService.addAddress(postData)).subscribe(res => {
      console.log(res);
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this.toast.onSuccess(res?.message);
        this.modalController.dismiss({
          'newaddress': true
        });
      } else {
        console.log('Error response:', res);

        // Show an error message
        alert("Error in address data, please try to fill carefully!");
      }
    
      this.isSubmitted = false;
    }, err => {
      console.log(err);
      this.toast.onError('Something went wrong, please try again later.');
      this.isSubmitted = false;
    });
  }
}}
