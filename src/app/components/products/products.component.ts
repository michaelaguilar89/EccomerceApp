import { Component, inject } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private service:ProductService){

  }
  list:any;
  ngOnInit(){
    this.list=this.service.getProducts();
    console.log(this.list);
  }

  addToCar(element:ProductModel){
    this.service.addToCar(element);
  }
}
