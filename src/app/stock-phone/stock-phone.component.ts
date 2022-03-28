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
  selector: 'app-stock-phone',
  templateUrl: './stock-phone.component.html',
  styleUrls: ['./stock-phone.component.scss']
})
export class StockPhoneComponent implements OnInit {

  
  
 
    displayedColumns: string[] = ['Picture', 'Name','PrixAchat', 'Newprice','Qtestock'];
    datasource:any=[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    showspphone:any=false;
    searchTerm!: string;
  
   
    
  
  
  
  
  
  
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
    danger:any=false;
    constructor(public spinner: NgxSpinnerService,private router: Router, private modalService: NgbModal,
      private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
    ) {
  
  
  
   
    }
    ngOnInit(): void {
      this.showspphone=true;
      this.showspinnerphones();
      this.getallsmartphone();
       
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
  
    AtteintStockDanger(id)
    {
      console.log("ID "+id);
      let updatedphone =
      {
        id: 0,
        urlHash: "string",
        brandId: 0,
        name:"string",
        picture:"string",
        releasedAt: "string",
        body: "string",
        os: "string",
        storage: "string",
        displaySize: "string",
        displayResolution: "string",
       cameraPixels: "string",
        videoPixels: "string",
        ram: "string",
      chipset: "string",
        batterySize:"string",
        batteryType: "string",
        specifications: "string",
       deletedAt: "2022-02-25T21:29:02.767Z",
       createdAt: "2022-02-25T21:29:02.767Z",
       updatedAt: "2022-02-25T21:29:02.767Z",
       PrixAchat: 0,
       Newprice: 0,
       Istop: 0,
       Qtestock: 0,
       Stockdanger: 1
      }
      console.log("phone alert danger stock  " + JSON.stringify(updatedphone));
      console.log("prepare ...  " + JSON.stringify(updatedphone));
 
       this.service.httpPutExample(id, updatedphone);
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
  
   
  
  
  
    }
  
  
  



