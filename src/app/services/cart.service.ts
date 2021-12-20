import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myProduct } from '../model/myProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8000";

  //fetch all cart
  getAllCart():Observable<any>{
    let URL = this.baseURL + '/carts';

    return this.http.get(URL);
  }

  //fetch cart by id
  getCartById(uniqueId: number):Observable<any>{
    let URL = this.baseURL + '/cartById/' + uniqueId;

    return this.http.get(URL);
  }

  //insert in cart
  insertCart(cartObj: myProduct):Observable<any>{
    let URL =  this.baseURL + '/insertCart';

    let header = {'content-type': 'application/json'};

    return this.http.post(URL, cartObj, {'headers': header, 'responseType': 'text'});
  }

  //for updating cart
  updateCart(cartObj: myProduct):Observable<any>{
    let URL =  this.baseURL + '/updateCart';

    let header = {'content-type': 'application/json'};

    return this.http.put(URL, cartObj, {'headers': header, 'responseType': 'text'});
  }

  //for deleteing cart
  deleteItem(id: number):Observable<any>{
    let URL = this.baseURL + '/deleteCart/' + id;
    console.log(URL);
    return this.http.delete(URL, {responseType: 'text'});
  }

  deleteItemByUser(id: number):Observable<any>{
    let URL = this.baseURL + '/deleteCartofUser/' + id;
    console.log(URL);
    return this.http.delete(URL, {responseType: 'text'});
  }
}
