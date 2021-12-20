import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cardS =[
    {
      img1: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2190900_720x.jpg?v=1633082110',

      img2: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2190917_720x.jpg?v=1633082107',

      heading:'RAINA - GINGLAM ANARAKALI DRESS',
      price: 'Rs. 1,50,000.00',


    },
    {
      img1: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2191008_720x.jpg?v=1633075599',

      img2: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2191025_720x.jpg?v=1633075598',
      heading:'BEHNAZ- KALAM KI CHAMAK ANARKALI SET',
      price: 'Rs. 80,000.00',
    },

    {
      img1: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2190985_720x.jpg?v=1633075340',

      img2: 'https://cdn.shopify.com/s/files/1/0593/6018/2450/products/NeetaLulla28-08-2190999_720x.jpg?v=1633075343',
      heading:'BANU- KALAM KI CHAMAK ANARKALI SET',
      price: 'Rs. 50,000.00',
    }
  ]

  readData ={img1: '', img2: '', heading:'', price: '',}

  getItem(item: any){
    console.log(item);
    this.readData = item;
  }
}
