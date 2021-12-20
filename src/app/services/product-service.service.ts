import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8000";

  getProduct():Observable<any>{
    let URL = this.baseURL + '/products';
    return this.http.get(URL);
  }
}
