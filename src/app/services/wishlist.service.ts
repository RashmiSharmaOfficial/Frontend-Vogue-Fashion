import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myProduct } from '../model/myProduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8000";

  //fetch all wishlist
  getAllWishList():Observable<any>{
    let URL = this.baseURL + '/wishlists'
    return this.http.get(URL);
  }

  //fetch wishlist by id
  getWishlistById(uniqueId: number):Observable<any>{
    let URL = this.baseURL + '/wishlistById/' + uniqueId;

    return this.http.get(URL);
  }

  insertWishlist(wishlistObj: myProduct):Observable<any>{
    let URL =  this.baseURL + '/insertWishlist';

    let header = {'content-type': 'application/json'};

    return this.http.post(URL, wishlistObj, {'headers': header, 'responseType': 'text'});
  }

  deleteWishlist(id: number):Observable<any>{
    let URL = this.baseURL + '/deleteWishlist/' + id;
    console.log(URL);
    return this.http.delete(URL, {responseType: 'text'});
  }
}
