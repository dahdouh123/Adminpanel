import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RstelecomServiceService } from '../rstelecom-service.service'
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableModule } from '@angular/material/table'  
import { MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AccessoiresComponent implements OnInit {
  displayedColumns: string[] = ['Image','Designation', 'Brand','Actions'];
  datasource:any=[];
  public density = 'comfortable';
  Types: any = ['All','CQ', 'Batterie', 'Airpods', 'PB','Kit','Headphones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public spinner: NgxSpinnerService,private router: Router, private modalService: NgbModal,
    private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.showspphone=true;
    this.showspinnerphones();
    this.getAllaccessoire();
    
  }

 

  showspphone:any=false;
  searchTerm!: string;

  accesscreateform = this.formBuilder.group({
    AcessName: "",
    Prix: 0,
    Batterie: 0,
    Brand: "",
    Image: "",
    Type:""
  });
// two way binding variable ////////
  name:any="string";
  prix:any=0;
  batterie:any=0;
  brand:any="string";
  image:any="string";
////////////////////////////////////
  delete:any=false;
  upd:any=false;
  Picture: any;
  ReleasedAt: any;
  result: any = [];
  config: any;
  closeResult: string;
  detaillist: any = [];
  editeditem:any=[];
  usertodelete: any = [];
  public columns: any;
  public rows: any;
  message: string;
  
  

 showspinnerdelete()
 { 
  this.showspphone=false;
  this.upd=false;
  this.delete=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 3000);
 }


 changeType(e: any) {
  this.accesscreateform.value.Type.setValue(e.target.value, {
    onlySelf: true,
  });
}
// Access formcontrols getter
get cityName() {

  return this.accesscreateform.get('Type');
}

 
showspinnerphones()
{
  this.delete=false;
  this.upd=false;  
  this.showspphone=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 3000);
}



 showspinnerupdate()
 { this.delete=false;
  this.showspphone=false;
    this.upd=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 3000);
 }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.accesscreateform.value);
    console.warn('Your Name has been submitted', this.accesscreateform.value.AcessName);

    let postedAcces =
    {
    
      Id: 0,
      AcessName: this.accesscreateform.value.AcessName,
      Prix: this.accesscreateform.value.Prix,
      Batterie: this.accesscreateform.value.Batterie,
      Brand: this.accesscreateform.value.Brand,
      Image: this.accesscreateform.value.Image,
      Type:this.accesscreateform.value.Type
    }
    console.log("postedAccess" + JSON.stringify(postedAcces));

    this.service.postAccess(postedAcces);
    this.accesscreateform.reset();
  }



  getAllaccessoire() {
   
    this.service.getAccessoires().subscribe(res => {
      console.log(JSON.stringify(res))
      this.rows = res;
      this.datasource = new MatTableDataSource(res);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
  
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.rows.length
      };
    }
    );
    

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}
  pageChanged(event) {
    this.config.currentPage = event;
  }


  opendetail(content, Id) {
    console.log("Id" + Id);
    return this.service.getAccessoireById(Id).subscribe(res => {
      this.detaillist = [res];
      console.log("datail " + JSON.stringify(this.detaillist));
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    )


  }

  search(value: string): void {
    this.rows = this.rows.filter((val) => val.Name.toLowerCase().includes(value));
  }


  deleteProduct(id): void {
    this.service.deleteAccess(id).toPromise()
      .then(
        response => {
          console.log(response);
          alert("Accessoire deleted successfuly");
          this.showspinnerdelete();

          this.getAllaccessoire();

        },
        error => {
          console.log(error);
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  opencreatemodal(mymodel) {
    this.modalService.open(mymodel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


 


















  opendelete(mymodel, Id) {

  }

  openedit(mymodel, Id) {
        
    console.log("Id" + Id);
    return this.service.getAccessoireById(Id).subscribe(res => {
      this.editeditem = [res];
      console.log("datail " + JSON.stringify(this.editeditem));
      this.modalService.open(mymodel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    )




  }

  update(id)  {
    console.log("Nom "+this.name);
     let updatedphone =
     {
      id: 0,
      AcessName: this.name,
      Prix: this.prix,
      Batterie: this.batterie,
      Brand: this.brand,
      Image: this.image,
     }
     console.log("avant send phone to service update  " + JSON.stringify(updatedphone));
     console.log("prepare ...  " + JSON.stringify(updatedphone));

     this.service.httpPutExampleAccessoire(id, updatedphone);
      this.modalService.dismissAll();

      this.showspinnerupdate();
       
      this.getAllaccessoire();


    
  }


}
