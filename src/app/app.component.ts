import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vogue';
  constructor(private authService: AuthenticationService, private router: Router){};

  isUser:any;
  ngDoCheck(){
    // console.log("Do check is called");
     this.isUser = localStorage.getItem(this.authService.varIsLoggedIn);
  }

  logout(){
    // location.reload();
    this.authService.logout();
    this.router.navigate(['/home'])
  }

}
