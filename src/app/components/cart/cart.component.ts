import { Component, inject } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  total=0;
  private service= inject(ProductService);
  list:CartModel[]=[];
  ngOnInit(){
    this.list=this.service.cartList;
    console.log(this.list);
    this.total=this.service.Total;
  }

  substract(id:number){
    this.service.restQuantity(id);
    this.total=this.service.Total;
  }

  sum(id:number){
    this.service.sumQuantity(id);
    this.total=this.service.Total;
  }
}
