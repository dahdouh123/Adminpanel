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
  selector: 'app-puces',
  templateUrl: './puces.component.html',
  styleUrls: ['./puces.component.scss']
})
export class PucesComponent implements OnInit {
  
  
 
    displayedColumns: string[] = ['Image', 'Operateur', 'Designation','Actions'];
    datasource:any=[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    showspphone:any=false;
    searchTerm!: string;
  
    pucecreateform = this.formBuilder.group({
      Operateur: '',
      Designation: '',
      G4: 0,
      G3: 0,
      Abon1000: '',
      Abon1500: '',
      Abon2000: '',
      Hadra: '',
      Image:'',
      Prix:0
    });
  // two way binding variable 
    operateur:any="string";
    designation:any="string";
    g4:any=0;
    g3:any=0;
    prix:any=0;
    abon1000:any="string";
    abon1500:any="string";
    abon2000:any="string";
    hadra:any="string";
    image:any="string";
    
  
  
  
  
  
  
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
      this.getAllpuces();
      
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
  
    onSubmit(): void {
      // Process checkout data here
      console.warn('Your order has been submitted', this.pucecreateform.value);
      console.warn('Your Name has been submitted', this.pucecreateform.value.Designation);
  
      let postedpuce =
      {
          Id: 0,
          Operateur: this.pucecreateform.value.Operateur ,
          Designation:this.pucecreateform.value.Designation ,
          G4: this.pucecreateform.value.G4,
          G3: this.pucecreateform.value.G3,
          Image:this.pucecreateform.value.Image ,
          Abon1000:this.pucecreateform.value.Abon1000 ,
          Abon1500:this.pucecreateform.value.Abon1500 ,
          Abon2000:this.pucecreateform.value.Abon2000 ,
          Hadra:this.pucecreateform.value.hadra,
          Prix:this.pucecreateform.value.Prix 
        }
      
      console.log("posted puce" + JSON.stringify(postedpuce));
  
      this.service.postPuces(postedpuce);
      alert("puce created successfuly");
      this.pucecreateform.reset();
    }
  
  
  
    getAllpuces() {
     
      this.service.getAllpuces().subscribe(res => {
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
      return this.service.getPuceById(Id).subscribe(res => {
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
      this.service.deletePuces(id)
        .subscribe(
          response => {
            console.log(response);
            alert("Puce deleted successfuly");
            this.showspinnerdelete();
  
            this.getAllpuces();
  
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
      return this.service.getPuceById(Id).subscribe(res => {
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
      console.log("Nom "+this.designation);
       let updatedpuce =
       {
          Id: 0,
          Operateur: this.operateur ,
          Designation:this.designation ,
          G4: this.g4,
          G3: this.g3,
          Image:this.image ,
          Abon1000:this.abon1000 ,
          Abon1500:this.abon1500 ,
          Abon2000:this.abon2000 ,
          Hadra:this.hadra ,
          Prix:this.prix
       }
       console.log("avant send puce to service update  " + JSON.stringify(updatedpuce));
  
        this.service.putPuces(id, updatedpuce);
        this.getAllpuces();
        this.modalService.dismissAll();
  
        this.showspinnerupdate();
         
     this.getAllpuces();
  
      
    }
  
  
  
    }
  
  
  