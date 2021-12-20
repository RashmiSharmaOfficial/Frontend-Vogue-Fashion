export class myProduct{
  productId: number = 0;
  uniqueId:number = 0;
  uniqueEmail: string = "";
  img:string ="";
  name:string ="";
  price:string = "";
  qty:number = 1;

  constructor(productId: number, uniqueId:number, uniqueEmail: string, img:string, name:string , price:string, qty:number)
     {
       this.productId = productId;
      this.uniqueId = uniqueId;
      this.uniqueEmail = uniqueEmail,
      this.img = img;
      this.name = name;
      this.price = price;
      this.qty = qty;
    }
}
