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
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss']
  })
  export class PromoComponent implements OnInit {
  
  
 
    displayedColumns: string[] = ['Image', 'Titre','Oldprice','Newprice','Etat','Actions'];
    datasource:any=[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    showspphone:any=false;
    searchTerm!: string;
  
    annoncecreateform = this.formBuilder.group({
      Titre: '',
      Description: '',
      Oldprice: 0,
      Newprice: 0,
      Image: '',
      Etat: 0,
    });
  // two way binding variable 
    titre:any="string";
    description:any="string";
    oldprice:any=0;
    newprice:any=0;
    image:any="string";
    etat:any=0;
   
    
  

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
      this.getAllannonces();
      
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
  
   etatchange(etat,id)
   {
    console.log("etat init "+etat);
    let updatedetat =
    {
     Id: 0,
     Titre: "string",
     Description: "string",
     Image: "string",
     Oldprice: 0,
     Newprice: 0,
     Etat: etat,
    }
    console.log("avant send annonce to service update  " + JSON.stringify(updatedetat));
    console.log("prepare ...  " + JSON.stringify(updatedetat));

     this.service.putChangeanonceEtat(id, updatedetat,etat);
     this.getAllannonces();
     this.modalService.dismissAll();

     this.showspinnerupdate();
      
  this.getAllannonces();


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
      console.warn('Your order has been submitted', this.annoncecreateform.value);
      console.warn('Your Name has been submitted', this.annoncecreateform.value.Designation);
  
      let postedannonce =
      {
          Id: 0,
          Titre: this.annoncecreateform.value.Titre ,
          Description:this.annoncecreateform.value.Description ,
          Oldprice: this.annoncecreateform.value.Oldprice,
          Newprice: this.annoncecreateform.value.Newprice,
          Image:this.annoncecreateform.value.Image ,
          Etat:0 
        }
      
      console.log("posted puce" + JSON.stringify(postedannonce));
  
      this.service.postAnnonce(postedannonce);
      alert("annonce created successfuly");
      this.annoncecreateform.reset();
    }
  
  
  
    getAllannonces() {
     
      this.service.getAnnonces().subscribe(res => {
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
      return this.service.getAnnonceById(Id).subscribe(res => {
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
      this.service.deleteAnnonce(id)
        .subscribe(
          response => {
            console.log(response);
            alert("Annonce deleted successfuly");
            this.showspinnerdelete();
  
            this.getAllannonces();
  
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
      return this.service.getAnnonceById(Id).subscribe(res => {
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
      console.log("Nom "+this.titre);
       let updatedanonce =
       {
        Id: 0,
        Titre: this.titre,
        Description: this.description,
        Image: this.image,
        Oldprice: this.oldprice,
        Newprice: this.newprice,
        Etat: 0,
       }
       console.log("avant send annonce to service update  " + JSON.stringify(updatedanonce));
       console.log("prepare ...  " + JSON.stringify(updatedanonce));
  
        this.service.putAnnonce(id, updatedanonce);
        this.getAllannonces();
        this.modalService.dismissAll();
  
        this.showspinnerupdate();
         
     this.getAllannonces();
  
      
    }
  
  
  
    }
  
  
  
