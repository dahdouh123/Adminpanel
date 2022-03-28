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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.scss']
})
export class VentesComponent implements OnInit {


  displayedColumns: string[] = ['Client', 'Article', 'Quantite', 'Prix', 'Total', 'Benefice'];
  datasource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showspphone: any = false;
  searchTerm!: string;
  arrayofitems: any = [];
  commandedItems: any;










  ////////////////////////////////////
  delete: any = false;
  upd: any = false;
  Picture: any;
  ReleasedAt: any;
  Name: string = '';
  result: any = [];
  config: any;
  closeResult: string;
  detaillist: any = [];
  editeditem: any = [];
  usertodelete: any = [];
  public columns: any;
  public rows: any;
  message: string;
  benificeTot:any=0;
  Caisee:any=0;
  countcommands:any=0;
  CommandesSum=0;
  constructor(public spinner: NgxSpinnerService, private router: Router, private modalService: NgbModal,
    private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder,
  ) {




  }
  ngOnInit(): void {
    this.getVentes();
    this.getCommandes();
  }




 
  getCommandes()
  {
      this.service.getcommandes().subscribe(res=>
          { 
              console.log(JSON.stringify(res));
              this.countcommands=res.length;
              console.log("commandes count "+res.length);
          }
         );
  }





  getVentes() {

    this.service.getVentes().subscribe(res => {
      console.log(JSON.stringify(res));
      res.forEach(element => {
        this.benificeTot+=element.Benefice;
        this.Caisee+=element.Total;
      });
      this.datasource = new MatTableDataSource(res);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: res.length
      };
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  pageChanged(event) {
    this.config.currentPage = event;
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



 





















  





}






