export class Products{
  productId:number = 0;
  gender:string ="";
  img1:string ="";
  img2:string = ""
  price:string = "";
  aprice:string = "";
  dprice:string = "";
  name:string = "";
  categories:string = "";
  brand:string = "";



  constructor(id:number, gender:string,img1:string , img2:string, price:string, aprice:string, dprice:string,
   name:string, categories:string, brand:string){
    this.productId = id;
    this.gender = gender;
    this.img1 = img1;
    this.img2 = img2;
    this.price = price;
    this.aprice = aprice;
    this.dprice = dprice;
    this.name = name;
    this.brand = brand;
    this.categories = categories;
  }
}
