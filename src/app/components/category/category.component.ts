import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { myProduct } from 'src/app/model/myProduct';
import { ProductService } from 'src/app/services/product-service.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private authService: AuthenticationService, private productService: ProductService, private wishlistService: WishlistService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.readData();
    this.showCart();
  }

  isUser:any;
  ngDoCheck(){
    // console.log("Do check is called");
     this.isUser = localStorage.getItem(this.authService.varIsLoggedIn);
  }

  proData:Products[] = [];
  copyProData:Products[] = [];
  wishlistData: myProduct[] = [];
  cartData: myProduct[] = [];
  uniqueId: number = this.authService.varUniqueId;
  uniqueEmail: string = this.authService.varUnqueEmail;



  readData(){
    this.productService.getProduct().subscribe(
      (data) => {
        this.proData = data;
        this.copyProData = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);

      }
    )
  }




  //--------filter operation -------

  flag:any = [];
  resetAll(){
    this.flag = []
    let textinputs = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < textinputs.length; i++){
      // console.log(textinputs[i].target.checked)
      console.log((<HTMLInputElement>textinputs[i]).checked);
      if((<HTMLInputElement>textinputs[i]).checked == false){
        this.flag.push((<HTMLInputElement>textinputs[i]).checked);
      }
      console.log(this.flag);

    }
    if(this.flag.length == textinputs.length){
      this.proData = this.copyProData;
    }
  }

  unfilter(){
    let textinputs = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < textinputs.length; i++){
      // console.log(textinputs[i].target.checked)
      console.log((<HTMLInputElement>textinputs[i]).checked);
      (<HTMLInputElement>textinputs[i]).checked = false;

    }
    this.proData = this.copyProData;
  }

  arrOfFilters:any = [];
  onchange(type: string, event:any){
    if(event.target.checked){
      let obj = {"type": type, "option": event.target.value};
      this.arrOfFilters.push(obj);
    }
    else{
      this.arrOfFilters = this.arrOfFilters.filter((item:any) => item.option != event.target.value);
    }
    console.log('arrOffilter',this.arrOfFilters);
    this.filterOperation();
  }

  tempArray:any = []
  filteredArray:any = []
  genderArray:any = [];
  brandArray:any = [];

  filterOperation(){
    if(this.arrOfFilters.length == 0){
      //if no filters
      this.proData = this.copyProData;
    }
    else{
      this.filteredArray = [];
      this.genderArray = [];
      this.brandArray = [];
      let brandSelected = false;
      let genderSelected = false;

      for(let item of this.arrOfFilters){
        if(item.type == "gender"){
          if(genderSelected && brandSelected){

            this.tempArray = this.copyProData.filter(i => i.gender == item.option)
            for(let i of this.tempArray){
              this.genderArray.push(i);
            }

            this.tempArray = this.brandArray.filter((i:any) => i.gender == item.option);

          }
          else if(brandSelected && !genderSelected){
            this.tempArray = this.copyProData.filter(i => i.gender == item.option);
            for(let i of this.tempArray){
              this.genderArray.push(i);
            }
            this.tempArray = this.filteredArray.filter((i:any) => i.gender == item.option);
            this.filteredArray = [];


          }else{
            this.tempArray = this.copyProData.filter(i => i.gender == item.option);
            for(let i of this.tempArray){
              this.genderArray.push(i);
            }
          }
          genderSelected = true;

          for(let i of this.tempArray){
            this.filteredArray.push(i);
          }
          console.log('gender array', this.genderArray);

        }
        else if(item.type == "brand"){
          if(brandSelected && genderSelected){
            this.tempArray = this.copyProData.filter(i => i.brand == item.option)

            for(let i of this.tempArray){
              this.brandArray.push(i);
            }

            this.tempArray = this.genderArray.filter((i:any) => i.brand == item.option);

          }
          else if(genderSelected && !brandSelected){
            this.tempArray = this.copyProData.filter(i => i.brand == item.option)

            for(let i of this.tempArray){
              this.brandArray.push(i);
            }

            this.tempArray = this.filteredArray.filter((i:any) => i.brand == item.option);
            this.filteredArray = [];
          }else{
            this.tempArray = this.copyProData.filter(i => i.brand == item.option);
            for(let i of this.tempArray){
              this.brandArray.push(i);
            }
          }
          brandSelected = true;

          for(let i of this.tempArray){
            this.filteredArray.push(i);
          }
          console.log('brand array', this.brandArray);

        }
      }
      this.proData = this.filteredArray;
      console.log('after filtering', this.filteredArray);
    }
  }

  id = 0;
  addToWishlist(img: string, name: string, price: string){
    this.uniqueId = this.authService.varUniqueId;
    this.uniqueEmail =
    this.authService.varUnqueEmail;

    let wishlistObj = new myProduct(this.id, this.uniqueId, this.uniqueEmail, img, name, price, 1);

    this.wishlistService.insertWishlist(wishlistObj).subscribe(
      (data) => {
        console.log("Inserted data is "+data);
      },
      (error) => console.log("error", error)
    )

  }







  totalPrice:number = 0;

  showCart(){
    this.cartService.getCartById(this.uniqueId).subscribe(
      (data:any)=> {
        this.cartData = data;
        console.log('data by email ', data);
        this.calculateTotal();
      })
  }

  calculateTotal(){
    this.totalPrice = 0;
    this.cartData.forEach(element => {
      this.totalPrice = this.totalPrice + parseInt(element.price.substr(4)) * element.qty;
    });
  }


  addToCart(type:number, productId:number, img: string, iname: string, price:string){
    console.log("product id from addtoCart ", productId);

    let checkCartExist = 0;

    let qty = 1;
    console.log("cart from add to cart",this.cartData);
    console.log("productdata", this.proData);


    this.cartData.forEach(element => {
      if(element.productId == productId){
        if(type == 1){
          qty = element.qty + 1;
        }
        else{
          qty = element.qty - 1;
        }
        if(qty == 0){
          this.cartService.deleteItem(productId).subscribe(
            (data) => {
              console.log("deleted ", data);
              this.showCart();
            },
          (err) => console.error("error", err)
          )
          checkCartExist = 2;
        }
        if(checkCartExist != 2){
          this.updateCart(productId, this.uniqueId, this.uniqueEmail, img, iname, price, qty);
        }
        checkCartExist = 1;
      }
    });

    if(checkCartExist == 0){
      let cartObj = new myProduct(productId, this.uniqueId, this.uniqueEmail, img, iname, price, qty);

      this.cartService.insertCart(cartObj).subscribe(
        (data) => {
          console.log("inserted data is", data.img);
          this.showCart();
        },
        (error) => console.log("error", error)
      )
    }


  }


  updateCart(id: number, uniqueId: number, uniqueEmail:string, img: string, iname: string, price: string, qty: number){
    let updatedCartObj = new myProduct(id, uniqueId, uniqueEmail, img, iname, price, qty);

    this.cartService.updateCart(updatedCartObj).subscribe(
      (data) => {
        // console.log('updated data', data);
        this.showCart();
      },
      (err) => console.error("error ", err)
    )
  }


  //for payment gateway
  buynow(){
    let ele:HTMLElement = document.getElementById('closeBtn') as HTMLElement
    ele.click();
    this.router.navigate( ['/payment']);
  }

  //


}
