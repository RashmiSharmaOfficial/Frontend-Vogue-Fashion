import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoggingService } from "../../services/logging.service";

interface Salutation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loggingService: LoggingService) { }

  submitted: boolean = false;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['',  Validators.required],
      userPassword: ['',  Validators.required],
      userSalutation: ['',  Validators.required],
      userDob: [''],
    })
  }



  signUp(){
    this.submitted = true;
    console.log(this.signupForm.value);
    this.loggingService.insertUser(this.signupForm.value).subscribe(
      res => {
        alert("Signup successful");

        let user = {userEmail: this.signupForm.value.userEmail, userName: this.signupForm.value.userName};

        this.loggingService.sendEmail(user).subscribe((data) => {
          console.log("mail sent to", user.userEmail);
        }, (err) => {
          console.error("error ", err);
        })

        this.signupForm.reset();
        console.log(this.signupForm.value);
        this.router.navigate(['login'])
      },
      (err) => {
        alert("Email already exists, Please login!");
      }
    )
  }

  salute: Salutation[] = [
    {value: 'none-0', viewValue: 'None'},
    {value: 'Mr.', viewValue: 'Mr.'},
    {value: 'Mrs.', viewValue: 'Mrs.'},
    {value: 'Miss.', viewValue: 'Miss.'},
  ];

}
