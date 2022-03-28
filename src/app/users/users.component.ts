
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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  
 
    displayedColumns: string[] = ['Image', 'Nom', 'Prenom','Actions'];
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
    constructor(public spinner: NgxSpinnerService,private router: Router, private modalService: NgbModal,
      private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
    ) {
  
  
  
     
    }
    ngOnInit(): void {
      this.showspphone=true;
      this.showspinnerphones();
      this.getAllUsers();
      
    }
  
   showspinnerdelete()
   {  this.showspphone=false;
    this.upd=false;
  
      this.delete=true;
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
   }
  
  
   
  showspinnerphones()
  {
    this.showspphone=true;
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
  
   showspinnerupdate()
   {  this.showspphone=false;
    this.delete=false;
      this.upd=true;
    this.spinner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
   }
  
  
  
  
    getAllUsers() {
     
      this.service.getUsers().subscribe(res => {
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
      return this.service.getUserByid(Id).subscribe(res => {
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
  
  
  
   
  sendmessage(id)
  {

  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    }
  
  
  