import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  varIsLoggedIn = "isLoggedIn";
  varUniqueId:number = 0;
  varUnqueEmail:string = "";

  login(id: number, email: string){
    localStorage.setItem(this.varIsLoggedIn, "true");
    this.varUniqueId = id;
    this.varUnqueEmail = email;
    console.log(this.varUniqueId);
    alert("Logged In successfully!")
  }

  logout(){
    localStorage.setItem(this.varIsLoggedIn, "false");
    alert("We will miss you, come back soon!!!")
  }
}
