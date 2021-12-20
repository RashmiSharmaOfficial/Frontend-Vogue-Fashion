import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { LoggingService } from '../../services/logging.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthenticationService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  uniqueId: number = 0;
  uniqueEmail: string = "";
  wrongPassword = false;
  wrongEmail = false;

  login(){
    this.loggingService.getAllUser().subscribe(res =>
    {
      const user = res.find((item: any) => {
        this.uniqueId = item.userId;
        this.uniqueEmail = item.userEmail;

        if(item.userEmail === this.loginForm.value.email && item.userPassword != this.loginForm.value.password){
          this.wrongPassword = true;
        }
        else if(item.userEmail != this.loginForm.value.email && item.userPassword != this.loginForm.value.password){
          this.wrongEmail = true;
        }
        return item.userEmail === this.loginForm.value.email && item.userPassword === this.loginForm.value.password
      });
      if(user){
        this.authService.login(this.uniqueId, this.uniqueEmail);
        this.loginForm.reset();
        this.router.navigate(['home']);
      }else{
        if(this.wrongPassword){
          alert("Forgot your password?")
        }
        else if(this.wrongEmail){
          alert("Not registered? Register now!!");
        }
        this.loginForm.reset();
      }
    }, err => {
      alert("Something went wrong :(");
        this.loginForm.reset();

    })
  }


}
