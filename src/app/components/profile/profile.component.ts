import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from 'src/app/services/wishlist.service';
import { LoggingService } from 'src/app/services/logging.service';
import { myProduct } from 'src/app/model/myProduct';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService, private wishlistService: WishlistService, private http: HttpClient, private loggingService: LoggingService) { }

  username = '';
  email = '';
  dob = '';
  flag = false;

  ngOnInit(): void {
    this.readData();
    this.getdata();
  }

  wishlistArr: myProduct[] = [];
  uniqueId: number = 0;
  uniqueEmail: string = "";

  //for getting details of all user
  readData(){
    this.uniqueId = this.authService.varUniqueId;
    this.uniqueEmail = this.authService.varUnqueEmail;

    this.loggingService.getAllUser().subscribe(res => {
      const user = res.find((item: any) => {
        console.log(item);

        if(item.userId === this.uniqueId){
          this.username = item.userSalutation+' '+item.userName;
          this.email = item.userEmail;
          this.dob = item.userDob;
          this.flag = true;
        }
      })
    })
  }

  //for gettinng wishlist
  getdata(){
    this.wishlistService.getWishlistById(this.uniqueId).subscribe(
      (data:any)=> {
        this.wishlistArr = data;
        this.flag = true;
        console.log('data by category ', data);
      },
      (err) => {
        console.error("error ", err);
      }
    )
  }

  //for deleting wishlist
  deleteItem(recordId: any){
    this.wishlistService.deleteWishlist(recordId).subscribe(
      (data) => {
        this.flag = true;
        this.getdata();
      },
      (error) => console.log("unable to delete record", error)

    )
  }



}
