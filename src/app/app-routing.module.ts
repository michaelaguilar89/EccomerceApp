import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'productDetail/:id',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
