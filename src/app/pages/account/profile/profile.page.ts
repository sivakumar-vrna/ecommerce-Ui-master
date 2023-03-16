import { Component, OnInit } from '@angular/core';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // email: string;
  name:string;
  age:number;
  
  newCardForm: FormGroup;
  isSubmitted = false;




  constructor(
    private orchService: OrchestrationService,
    private toast: ToastWidget,
    private errorservice:ErrorService,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    private userService:UserService,

    ) { }

    get f() {
    return this.newCardForm.controls;
  }

  ngOnInit() {
    this.newCardForm = this.formBuilder.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      age:['',[Validators.required]],
      // add other form controls here
    });
  }

  async onSubmit() {
    this.isSubmitted = true;
    const currentDate = new Date();
  
    const postData = {
      age: this.newCardForm.value.age,
      name: this.newCardForm.value.name,
      date:currentDate.toISOString(), 
      profileId: 0,
      userId : await this.userService.getUserId()
  
    };
    console.log(postData);
    if (this.newCardForm.valid) {
      (await this.orchService.addprofile(postData)).subscribe(res => {
        console.log(res); // log the response object here
        if (res.status && res.status.toLowerCase() === 'success' && res.statusCode == 200) {
          console.log(res);
          if (res.message) {
            this.toast.onSuccess(res.message);
          }
          this.modalController.dismiss({
            'new profile': true
          });
        } else {
          this.toast.onFail('Error in adding profile');
        }
        this.isSubmitted = false;
      }, error => {
        console.error(error);
        this.isSubmitted = false;
        this.toast.onFail('Error in adding profile');
      });
      
    } else {
      this.toast.onWaring('Error in profile data, please try to fill carefully!');
    }
  }
  
}
