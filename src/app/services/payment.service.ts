import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8000";

  stripePayment(obj: any):Observable<any>{
    let URL = this.baseURL + '/stripe';
    let header = {'content-type': 'application/json'};

    return this.http.post(URL, obj, {'headers': header, 'responseType': 'json'});
  }

}
