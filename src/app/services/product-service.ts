import { HttpClient } from "@angular/common/http";
import { ProductModel } from "../models/product.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CartModel } from "../models/cart.model";
import { RouterTestingHarness } from "@angular/router/testing";

@Injectable({
    providedIn: 'root',
  })
export class ProductService {

    cartList:CartModel[]=[];
    exist=false;
    Total=0;
    list:ProductModel[]=[
        {id:1,name:'iPhone 10 ',description:'Apple iPhone 10 Mini, 64GB, Blue - Unlocked (Renewed)',price:285,photos:['https://m.media-amazon.com/images/I/61M5w4HMIJL._AC_UY218_.jpg']},
        {id:2,name:'Apple iPhone 12 ',description:'Apple iPhone 12, 64GB, Red - Unlocked (Renewed Premium)',price:499,photos:['https://m.media-amazon.com/images/I/61if22pWHbL._AC_UY218_.jpg']},
        {id:3,name:'Apple iPhone XR ',description:'Apple iPhone XR, US Version, 64GB, Blue - Unlocked (Renewed)',price:226,photos:['data:image/jpeg;base64,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']},
        {id:4,name:'Apple iPhone 11 Pro Max ',description:'Apple iPhone 11 Pro Max, 256GB, Space Gray - Unlocked (Renewed Premium)',price:580,photos:['https://m.media-amazon.com/images/I/81LmL94PUvS._AC_UY218_.jpg']},    
        {id:5,name:'Apple iPhone 12 Pro Max ',description:'Apple iPhone 12 Pro Max, 256GB, Pacific Blue - Unlocked (Renewed Premium)',price:285,photos:['https://m.media-amazon.com/images/I/71FuI8YvCNL._AC_UY218_.jpg']},
        {id:6,name:'IPhone 13 Mini ',description:'IPhone 13 Mini, 512GB, Midnight - Unlocked (Renewed)',price:900,photos:['https://m.media-amazon.com/images/I/61eDXs9QFNL._AC_UY218_.jpg']},    
        {id:7,name:'IPhone 14 Pro MAX ',description:'IPhone 14 Pro MAX Unlocked Cell Phone, Long Battery Life 6.82" HD Screen Unlocked Phones, 6+256GB Android 13 Smartphone with 128G ',price:285,photos:['https://m.media-amazon.com/images/I/61itehvdgsL._AC_UY218_.jpg']},
        {id:8,name:'SAMSUNG Galaxy S23 Ultra',description:'SAMSUNG Galaxy S23 Ultra Cell Phone, Factory Unlocked Android Smartphone, 256GB, 200MP Camera, Night Mode, Long Battery Life, S',price:499,photos:['https://m.media-amazon.com/images/I/71HtN4qqLZL._AC_UY218_.jpg']},
        {id:9,name:'SAMSUNG Galaxy A14',description:'SAMSUNG Galaxy A14 4G LTE (128GB + 4GB) Unlocked Worldwide (Only T-Mobile/Mint/Metro USA Market) 6.6" 50MP Triple Camera + ',price:137,photos:['https://m.media-amazon.com/images/I/717yeZFskGL._AC_UL320_.jpg']},
        {id:11,name:'Huawei Y9s',description:'Huawei Y9s 6GB 128GB 6.59” Display, 48MP Triple AI Cameras Smartphone Auto Selfie Pop-Up Front Camera 4000mAh Battery ',price:499,photos:['https://m.media-amazon.com/images/I/51jSWXBgdvL._AC_UY218_.jpg']},
        {id:12,name:'Huawei P30 Lite',description:'Huawei P30 Lite (128GB, 4GB RAM) 6.15" Display, AI Triple Camera, 32MP Selfie, Dual SIM Global 4G LTE GSM Factory Unlocked MAR-LX3A',price:499,photos:['https://m.media-amazon.com/images/I/616+kGLMqJL._AC_UY218_.jpg']},
        {id:13,name:'SAMSUNG Galaxy S23 Ultra',description:'Huawei MediaPad T3 10" WiFi Tablet Android 16GB 2 RAM -Android Nougat -Aluminum Alloy Body (Gray)...',price:499,photos:['https://m.media-amazon.com/images/I/71lMeBh52wL._AC_UL320_.jpg']},
        {id:14,name:'Laptop Computer Metal Body',description:'Laptop Computer, Quad-Core Intel N95 Processor 16GB DDR4 512GB SSD, 15.6 inch 1080P FHD Laptop, Windows 11, Metal Body, 2.4G/5G WiFi, BT5.0, Webcam,',price:380,photos:['https://m.media-amazon.com/images/I/712Z5m++T4L._AC_UY218_.jpg']},
        {id:15,name:'HP 14 Laptop',description:'HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 11 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365',price:189,photos:['https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg']},
        {id:16,name:'Lenovo IdeaPad 3 Laptop,',description:'Lenovo IdeaPad 3 Laptop, Student and Business, 15.6” FHD Touchscreen Display, Intel Core i5-1135G7 Processor, 20GB RAM, 512GB SSD, Wi-Fi 6, SD Card Reader, HDMI',price:560,photos:['https://m.media-amazon.com/images/I/61oXknWtZgL._AC_UY218_.jpg']},
        {id:17,name:'Lenovo IdeaPad 1 14 Laptop',description:'Lenovo IdeaPad 1 14 Laptop, 14.0" HD Display, Intel Celeron N4020, 4GB RAM, 64GB Storage, Intel UHD Graphics 600, Win 11 in S Mode, Cloud Grey',price:169,photos:['https://m.media-amazon.com/images/I/71bphKmt0DL._AC_UY218_.jpg']},
        {id:18,name:'Lenovo IdeaPad Gaming 3',description:'Lenovo IdeaPad Gaming 3 - (2022) - Essential Gaming Laptop Computer - 15.6" FHD - 120Hz - AMD Ryzen 5 6600H - NVIDIA GeForce RTX 3050 - 8GB DDR5 RAM - 256GB',price:649.99,photos:['https://m.media-amazon.com/images/I/81zcUyiNcUL._AC_UY218_.jpg']},
        {id:19,name:'Laptop HP  15.6 Ultra',description:'Laptop HP  15.6 FHD 16GB DDR4 512GB SSD, Intel Quad-Core 12th Alder Lake N95(Up to 3.4GHz) Laptop Computers with Metal Body Support 2.4G/5G WiFi, BT5.0, 2×Speaker',price:399.98,photos:['https://m.media-amazon.com/images/I/712+imIejFL._AC_UY218_.jpg']},
        {id:20,name:'Lenovo IdeaPad 3 Laptop',description:'Lenovo IdeaPad 3 Laptop, 15.6" HD Touchscreen, 11th Gen Intel Core i3-1115G4 Processor, 20GB DDR4 RAM, 1TB PCIe NVMe SSD, HDMI, Webcam, Wi-Fi 5, Bluetooth',price:490,photos:['https://m.media-amazon.com/images/I/61QGMX0Qy6L._AC_UY218_.jpg']},
       



    

    ];
    //private url='http://api.escuelajs.co/api/v1/products?limit=50&offset=10';
    constructor(private http: HttpClient){

    }
    getProducts(){
       return this.list;
    }
    sumQuantity(id:number){
        if(this.cartList.length>0){
            for(let i=0;i<this.cartList.length;i++){
                if(this.cartList[i].id===id)//sum 1 to element on car
                  {
                    this.cartList[i].quantity=this.cartList[i].quantity+1;
                    this.cartList[i].subTotal=this.cartList[i].price*this.cartList[i].quantity;
                    this.exist=true;
                    this.Total=this.Total+this.cartList[i].price;
                    break;
                  }
    
            }
            
        }else{
            this.exist==false;
        }
       
    }
    restQuantity(id:number){
        for(let i=0;i<=this.cartList.length;i++){
            if(this.cartList[i].id===id)//substract 1 to element on car
              {
                this.cartList[i].quantity=this.cartList[i].quantity-1;
                this.cartList[i].subTotal=this.cartList[i].price*this.cartList[i].quantity;
                this.Total=this.Total-this.cartList[i].price;
              }

        }
    }
    sumTotal(){

    }
    substractoTotal(){

    }
    addToCar(element:ProductModel){
          
        this.sumQuantity(element.id)
        if(this.exist==false){
            const myCart:CartModel={
                id:element.id,
                name:element.name,
                description:element.description,
                price:element.price,
                quantity:1,
                subTotal:element.price*1,
                photos:element.photos
            }
            this.cartList.push(myCart);
            this.Total=this.Total+element.price;
            this.exist==false;

            
        
        }
        this.exist==false;
        
        alert(element.name +' ha sido agregado a su carrito');
        
    }
}
