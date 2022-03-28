import { RstelecomServiceService } from '@/rstelecom-service.service';
import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
         
      public barChartLabels = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre','Octobre','Novembre','Decemebre'];
      public barChartType = 'bar';
      public barChartLegend = true;
      public barChartData = [
        {data: [11, 20, 5, 19, 25, 30, 40,15,8,20,12,23], label: 'Commandes' , backgroundColor: 'lightgreen'}
      ];


    countphone : any=0;
    countusers : any=0;
    countcommands: any=0;
    countaccessoires:any=0;
    constructor(private router: Router, 
        private http: HttpClient, public service: RstelecomServiceService, 
      ) {}
    ngOnInit(): void {
     this.getSmartphones();
     this.getUsers();
     this.getCommandes();
     this.getAccessoires()
    }


    getAccessoires()
    {
        this.service.getAccessoires().subscribe(res=>
            { 
                console.log(JSON.stringify(res));
                this.countaccessoires=res.length;
                console.log("users online "+res.length);
            }
           );
    }

 
getSmartphones()
{
    this.service.getsmartphones().subscribe(res=>
        { 
            console.log(JSON.stringify(res));
            this.countphone=res.length;
            console.log("nbr"+res.length);
        }
       );
}

getUsers()
{
    this.service.getUsers().subscribe(res=>
        { 
            console.log(JSON.stringify(res));
            this.countusers=res.length;
            console.log("users online "+res.length);
        }
       );
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



}
