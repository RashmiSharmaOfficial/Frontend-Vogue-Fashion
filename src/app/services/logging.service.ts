import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoggingService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8000";

  //inserting a user
  insertUser(userObj: any):Observable<any>{
    let URL = this.baseURL + '/insertUsers';
    let header = {'content-type': 'application/json'};

    return this.http.post(URL, userObj, {'headers': header, 'responseType': 'text'});
  }

  //getting all user
  getAllUser():Observable<any>{
    let URL = this.baseURL + '/allUsers';
    return this.http.get(URL);
  }

  // to send welcome email
  sendEmail(data: any):Observable<any>{
    let URL = this.baseURL + '/sendEmail';

    return this.http.post(URL, data);
  }
}
