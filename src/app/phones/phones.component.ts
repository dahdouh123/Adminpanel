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
import { MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PhonesComponent implements OnInit {
  displayedColumns: string[] = ['Picture', 'Name', 'Body','Actions'];
  datasource:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showspphone:any=false;
  searchTerm!: string;

  phonecreateform = this.formBuilder.group({
    Designation: '',
    ReleasedAt: '',
    Picture: '',
    Body: '',
    Ram: '',
    Rom: '',
    BatterySize: '',
    Storage:'',
  });
// two way binding variable 
  name:any="string";
  ram:any="string";
  rom:any="string";
  batterie:any="string";
  body:any="string";
  image:any="string";
  dater:any="string";
  






////////////////////////////////////
  delete:any=false;
  upd:any=false;
  Picture: any;
  ReleasedAt: any;
  Name: string = '';
  result: any = [];
  config: any;
  closeResult: string;
  detaillist: any = [];
  editeditem:any=[];
  usertodelete: any = [];
  public columns: any;
  public rows: any;
  message: string;
  constructor(public spinner: NgxSpinnerService,private router: Router, private modalService: NgbModal,
    private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
  ) {



    this.columns = [
      { name: 'Id', prop: 'Id' },
      { name: 'Picture', prop: 'Picture' },
      { name: 'Name', prop: 'Name' },
      { name: 'Body', prop: 'Body' },
      { name: 'Os', prop: 'Os' },
      { name: 'Storage', prop: 'Storage' },
      { name: 'Ram', prop: 'Ram' },
      { name: 'BatterySize', prop: 'BatterySize' }
    ];
  }
  ngOnInit(): void {
    this.showspphone=true;
    this.showspinnerphones();
    this.getallsmartphone();
    
  }

 showspinnerdelete()
 {  this.showspphone=false;
  this.upd=false;

    this.delete=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 10000);
 }


 
showspinnerphones()
{
  this.showspphone=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 12000);
}

 showspinnerupdate()
 {  this.showspphone=false;
  this.delete=false;
    this.upd=true;
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 10000);
 }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.phonecreateform.value);
    console.warn('Your Name has been submitted', this.phonecreateform.value.Designation);

    let postedphone =
    {
    
      id: 0,
      urlHash: "",
      brandId: 0,
      name: this.phonecreateform.value.Designation,
      picture: this.phonecreateform.value.Picture,
      releasedAt: this.phonecreateform.value.ReleasedAt,
      body: this.phonecreateform.value.Body,
      os: "",
      storage: this.phonecreateform.value.Rom,
      displaySize: "string",
      displayResolution: "string",
      cameraPixels: "string",
      videoPixels: "string",
      ram: this.phonecreateform.value.Ram,
      chipset: "string",
      batterySize: this.phonecreateform.value.BatterySize,
      batteryType: "string",
      specifications: "string",
      deletedAt: "2022-02-25T21:29:02.767Z",
      createdAt: "2022-02-25T21:29:02.767Z",
      updatedAt: "2022-02-25T21:29:02.767Z",
      oldprice: 0,
      newprice: 0
    }
    console.log("postedphone" + JSON.stringify(postedphone));

    this.service.postPhone(postedphone);
    alert("phone created successfuly");
    this.phonecreateform.reset();
  }


  deletephone(id) {

  }

  getallsmartphone() {
   
    this.service.getsmartphones().subscribe(res => {
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
    return this.service.getsmartphonesbyId(Id).subscribe(res => {
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
    this.service.deletePhone(id)
      .subscribe(
        response => {
          console.log(response);
          alert("Phone deleted successfuly");
          this.showspinnerdelete();

          this.getallsmartphone();

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
    return this.service.getsmartphonesbyId(Id).subscribe(res => {
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
       urlHash: "string",
       brandId: 0,
       name:this.name,
       picture:this.image,
       releasedAt: this.dater,
       body: this.body,
       os: "string",
       storage: this.rom,
       displaySize: "string",
       displayResolution: "string",
      cameraPixels: "string",
       videoPixels: "string",
       ram: this.ram,
     chipset: "string",
       batterySize:this.batterie,
       batteryType: "string",
       specifications: "string",
      deletedAt: "2022-02-25T21:29:02.767Z",
      createdAt: "2022-02-25T21:29:02.767Z",
      updatedAt: "2022-02-25T21:29:02.767Z",
      PrixAchat: 0,
      Newprice: 0,
      Istop: 0,
      Qtestock: 0,
      Stockdanger: 0
     }
     console.log("avant send phone to service update  " + JSON.stringify(updatedphone));
     console.log("prepare ...  " + JSON.stringify(updatedphone));

      this.service.httpPutExample(id, updatedphone);
      this.getallsmartphone();
      this.modalService.dismissAll();

      this.showspinnerupdate();
       


    
  }



  }


