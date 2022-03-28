

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class RstelecomServiceService {
  readonly apicommandes = "http://rstelecom-001-site1.itempurl.com/api/Commandes";
  readonly apiphones = "http://rstelecom-001-site1.itempurl.com/api/Devices";
  readonly apiphones2 = "http://rstelecom-001-site1.itempurl.com/api/Phones";
  readonly apiuser = "http://rstelecom-001-site1.itempurl.com/api/Users";
  readonly apiaccessoire = "http://rstelecom-001-site1.itempurl.com/api/Accessoires";
  readonly apiannonce = "http://rstelecom-001-site1.itempurl.com/api/Annonces";
  readonly apinotification = "http://rstelecom-001-site1.itempurl.com/api/SendNotification";

  readonly apipuces = "http://rstelecom-001-site1.itempurl.com/api/Puces";
  readonly apiventes ="http://rstelecom-001-site1.itempurl.com/api/Ventes";
  readonly apilocal = "https://localhost:5001/api/Devices";
  dataChange: any;
  data: any;

  constructor(public http: HttpClient) { }

  ///////////////////////////////////////////// GET ////////////////////////////////////////////
  getcommandes(): Observable<any[]> {
    return this.http.get<any[]>(this.apicommandes);

  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiuser);

  }
  getVentes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiventes);

  }
  getsmartphones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiphones);

  }
  getAccessoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiaccessoire);
  }
  getAnnonces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiannonce);
  }

  getphones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiphones2);

  }

  getAllpuces(): Observable<any[]> {
    return this.http.get<any[]>(this.apipuces);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////// GET BY ID ////////////////////////////////////////////////////////////////
  getsmartphonesbyId(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apiphones + '/' + Id);

  }
  getAccessoireById(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apiaccessoire + '/' + Id);

  }
  getUserByid(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apiuser + '/' + Id);
  }

  getPuceById(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apipuces + '/' + Id);

  }

  getAnnonceById(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apiannonce + '/' + Id);

  }

  getCommandbyId(Id): Observable<any[]> {
    return this.http.get<any[]>(this.apicommandes + '/' + Id);

  }
  //////////////////////////////////////////////////// DELETE ////////////////////////////////////////////////////////////
  deletePhone(id): Observable<any[]> {
    return this.http.delete<any[]>(this.apiphones + '/' + id);
  }
  deleteAccess(id): Observable<any[]> {
  return   this.http.delete<any[]>(this.apiaccessoire + '/' + id);
      
  }
  deletePuces(id): Observable<any[]> {
    return this.http.delete<any[]>(this.apipuces + '/' + id);
  }
  deleteCommande(id): Observable<any[]> {
    return this.http.delete<any[]>(this.apicommandes + '/' + id);
  }

  deleteAnnonce(id): Observable<any[]> {
    return this.http.delete<any[]>(this.apiannonce + '/' + id);
  }
  /////////////////////////////////////////////// PUT /////////////////////////////////////////////////////////////
  httpPutExample(id, data) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended : " + JSON.stringify(data));


    this.http.patch(this.apiphones + '/' + id, data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }


  httpPutExampleAccessoire(id, data)  {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended : " + JSON.stringify(data));


    this.http.patch(this.apiaccessoire + '/' + id, data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
            this
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }


  putAnnonce(id, data ) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended : " + JSON.stringify(data));


    this.http.patch(this.apiannonce + '/' + id, data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }


  putChangeanonceEtat(id, data ,etat) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended : " + JSON.stringify(data));


    this.http.patch(this.apiannonce + '/' + id +'/'+ etat , data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

  putPuces(id, data) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended puce in service  : " + JSON.stringify(data));


    this.http.patch(this.apipuces + '/' + id, data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

  putCommande(id, data) {
    console.log("id"+id+"commande"+JSON.stringify(data));
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    console.log("sended : " + JSON.stringify(data));


    this.http.patch(this.apicommandes + '/' + id, data,
      { headers: headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }


  /////////////////////////////////////////////// POST //////////////////////////////////////////////////////////


  postPhone(phone) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    return this.http.post(this.apiphones, phone, { headers: headers }).subscribe((response: any) => {
      console.log(response);
    },
      err => {
        console.log(err);
      })

  }

  postVente(vente) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    return this.http.post(this.apiventes, vente, { headers: headers }).subscribe((response: any) => {
      console.log(response);
    },
      err => {
        console.log(err);
      })

  }


  postAnnonce(annonce) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    return this.http.post(this.apiannonce, annonce, { headers: headers }).subscribe((response: any) => {
      console.log(response);
    },
      err => {
        console.log(err);
      })

  }


  postNotif(notif) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    
    let Topic=JSON.parse(notif).Topic;
    let Title=JSON.parse(notif).Title;
    let Body=JSON.parse(notif).Body;
    let Image=JSON.parse(notif).img;

    return this.http.post(this.apinotification+"?"+"Topic="+Topic+"&Title="+Title+"&Body="+Body+"&img="+Image, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      alert("Notification sended successfuly");
    },
      err => {
        console.log(err);
      })

  }


  postPuces(puce) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    return this.http.post(this.apipuces, puce, { headers: headers }).subscribe((response: any) => {
      console.log(response);
    },
      err => {
        console.log(err);
      })

  }


  postAccess(acc) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    return this.http.post(this.apiaccessoire, acc, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.getAccessoires();
    },
      err => {
        console.log(err);
      })

  }

}

