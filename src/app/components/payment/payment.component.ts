import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PaymentService } from 'src/app/services/payment.service';
import { StripeService} from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { myProduct } from 'src/app/model/myProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  elements: any;
  card: any;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading:any;


  // optional parameters
  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  stripeForm !: FormGroup;

  constructor(private fb: FormBuilder,
    private stripeService: StripeService, private paymentService: PaymentService, private authService: AuthenticationService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.showCart();
    this.loading = false;
    this.createForm();

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#stripeCard');
        }
      });
  }

  createForm(){
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
  }

  buy(){
    const name = this.stripeForm.value.name;
    this.stripeForm.value.amount = this.totalPrice;
    this.submitted = true;
    this.loading = true;
    this.stripeData = this.stripeForm.value;
    console.log(this.stripeData);

    this.stripeService
    .createToken(this.card, {name})
    .subscribe(result => {
      if(result.token){
        this.stripeData['token'] = result.token;

        this.paymentService.stripePayment(this.stripeData).subscribe((res: any) => {
          if(res['success']){
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = res['status'];
            console.log("payment successful");
            alert("Payment successful!");
            this.cartService.deleteItemByUser(this.uniqueId).subscribe((res) => {
              console.log("cart emptied successfully!");
            }, (err) => {
              console.error("error ", err);
            })
            this.router.navigate(['category'])

          }else{
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = res['status'];
            console.log("payment unsuccessful");

          }
        })
      }else if(result.error){
        this.paymentStatus = result.error.message;
      }
    });
  }

  cartData: myProduct[] = [];
  uniqueId: number = this.authService.varUniqueId;
  uniqueEmail: string = this.authService.varUnqueEmail;

  totalPrice:number = 0;

  showCart(){
    console.log(this.authService.varUnqueEmail);

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


}
