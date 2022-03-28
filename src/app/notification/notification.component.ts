import { Component, Input, OnInit, ViewChild } from '@angular/core';
  import { RstelecomServiceService } from '../rstelecom-service.service'
  import { ViewEncapsulation } from '@angular/core';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class NotificationComponent implements OnInit {
  
  
 
    public density = 'comfortable';
    Topics: any = ['Amir','Soumaya', 'Users'];
  config: any;
  
   
    constructor(
      private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
    ) { }
    ngOnInit(): void {
      
    }
  
   
  
    
    notifcreateform = this.formBuilder.group({
      topic: "",
      Image: "",
      Body: "",
      Title: "",
    });
  
  ////////////////////////////////////
   
    
    
  
 
  
  
   changeType(e: any) {
    this.notifcreateform.value.topic.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get cityName() {
  
    return this.notifcreateform.get('topic');
  }
  
   
 
  
  
  
  
    onSubmit(): void {
      // Process checkout data here
      console.warn('Your order has been submitted', this.notifcreateform.value);
      console.warn('Your Name has been submitted', this.notifcreateform.value.AcessName);
           


      let postedNotif =
      {
      
      
        Topic: this.notifcreateform.value.topic,
        Title: this.notifcreateform.value.Title,
        Body: this.notifcreateform.value.Body,
       
        img: this.notifcreateform.value.Image,
      }
      console.log("postedAccess" + JSON.stringify(postedNotif));
  
      this.service.postNotif(JSON.stringify(postedNotif));
      this.notifcreateform.reset();
    }
  
  
  
  
  
    pageChanged(event) {
      this.config.currentPage = event;
    }
}
  
   
  