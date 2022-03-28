import { Component, OnInit } from '@angular/core';
import { RstelecomServiceService } from '../rstelecom-service.service'
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {  Input, ViewChild } from '@angular/core';
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
import { ElementFlags, updateLanguageServiceSourceFile } from 'typescript';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
export interface Data {
  commandes: string;
}
@Component({
  selector: 'app-commande',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CommandesComponent implements OnInit  {
  displayedColumns: string[] = ['Nom', 'Prenom', 'Email','Telephone','Date','Actions'];
  datasource:any=[];
  showspphone:any=false;

  commandedItems:string;
  public density = 'comfortable';
sum =0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  array=[];
  arrayofitems=[];
    result :any=[];
    public data: Data;
commandelist:object[]=[];
  public columns: any;
  public rows: any;
  detaillist: any[]=[];
  closeResult: string;
  config: any;
  constructor(
    public spinner: NgxSpinnerService,private router: Router, private modalService: NgbModal,
    private http: HttpClient, public service: RstelecomServiceService, private formBuilder: FormBuilder ) {
 

    
    this.columns = [
                    { prop: 'Id' },
                    { prop: 'Nom'},
                    { prop: 'Prenom'},
                    { prop: 'Email'},
                    { prop: 'Mobile'},
                    { prop: 'Adr'},
                    { prop: 'Adrf1'},
                    { prop: 'Adrf2'}
                  ];
  }
  ngOnInit(): void {
    this.service.getcommandes().subscribe(res=>
      {
        console.log(JSON.stringify(res))
        this.rows=res;
        this.datasource = new MatTableDataSource(res);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      }
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
}


  opendetail(content, Id) {
    console.log("Id" + Id);
    return this.service.getCommandbyId(Id).subscribe(res => {
      this.detaillist = [res];
      this.commandedItems=(this.detaillist.map(a=>a.CommandeItems)).toString();
      var object = JSON.parse(this.commandedItems);
for(var i in object) {
   this.array.push(object[i]);
  this.sum += object[i].TotPrix;
}
      console.log("list"+this.array);
      console.log("somme"+this.sum);

      console.log("datailist " +this.detaillist);
      console.log("datailist strinify " +JSON.stringify([res]));

      console.log("commande items  " +this.commandedItems);

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.array=[];
        this.sum=0;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.array=[];
        this.sum=0;

      });
    }
    )


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



  deleteCommande(id): void {
    this.service.deleteCommande(id)
      .subscribe(
        response => {
          console.log(response);
          alert("Commande deleted successfuly");


        },
        error => {
          console.log(error);
        });
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }


  ValiderCommande(idc) {


    if (confirm("Are you sure to validate Commande N " + idc)) {
      this.showspinnerupdate();
      return this.service.getCommandbyId(idc).subscribe(res => {
        this.detaillist = [res];
        let benifice = 0;
        let client = this.detaillist.map(a => a.Nom).toString().replace(/\s+/g, '');;
        console.log("clien name " + client);
        this.commandedItems = (this.detaillist.map(a => a.CommandeItems)).toString();
        var object = JSON.parse(this.commandedItems);
        for (var i in object) {
          console.log("object" + i + "est :" + object[i]);
          this.arrayofitems.push(object[i]);
          this.arrayofitems.forEach(element => {
            console.log(element.Prix);
            console.log(element.Prixachat);
            benifice = (element.Prix - element.Prixachat) * element.Qte;
            console.log("ben" + benifice);
            this.MiseajourStock(element.Model, element.Qte, idc);
            let vente =
            {
              Id: 0,
              Client: client,
              Article: element.Model,
              Quantite: element.Qte,
              Prix: element.Prix,
              Total: element.TotPrix,
              Benefice: benifice
            }
            console.log("vente=" + JSON.stringify(vente));
            this.service.postVente(vente);
            console.log("vente envoyé");
          });
        }
      })
    }

  }


  MiseajourStock(model , qte , idc)
  {
    console.log("model"+model+"----qte"+qte);
     return this.service.getsmartphones().subscribe(res=>
      {
        let Id=res.filter(a=>a.Name == model).slice(0,1).map(a=>a.Id);
        console.log("Id=="+Id);
            this.update(Id,qte , idc);        
      }
      )
  }










  update(id,qte,idc)  {
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
       oldprice: 0,
       newprice: 0,
          Istop: 0,
       Qtestock: qte,
    Stockdanger: 0
     };
     let commande= 
     {
      Id: 0,
      Nom: 'string',
      Prenom: 'string',
      Email: 'string',
      Mobile: 'string',
      Adr: 'string',
      Adrf1: 'string',
      Adrf2: 'string',
      CommandeItems: 'string',
      TokenUser: 0,
      Valide: 1
     }
     console.log("id commande"+idc);
     console.log("id phone to update"+id);

     this.service.httpPutExample(id, updatedphone);
    this.service.putCommande(idc,commande);
    }










    showspinnerupdate()
    {  this.showspphone=true;
     
     this.spinner.show();
   
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 12000);
    }


}
