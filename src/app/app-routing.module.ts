import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CapNhatMKComponent } from './home/User/cap-nhat-mk/cap-nhat-mk.component';
import { CapNhatUserComponent } from './home/User/cap-nhat-user/cap-nhat-user.component';
import { ListProductComponent } from './home/Product/list-product/list-product.component';
import { FilterByCategoryComponent } from './home/Product/filter-by-category/filter-by-category.component';
import { FilterByBrandComponent } from './home/Product/filter-by-brand/filter-by-brand.component';
import { DetailProductComponent } from './home/Product/detail-product/detail-product.component';
import { ViewOrderHistoryComponent } from './home/User/view-order-history/view-order-history.component';
import { ShoppingCartComponent } from './home/Product/shopping-cart/shopping-cart.component';
import { ListOrderComponent } from './home/Order/list-order/list-order.component';
import { DetailOrderComponent } from './home/Order/detail-order/detail-order.component';
import { LoginComponent } from './home/User/login/login.component';
import { ReviewsComponent } from './home/Product/reviews/reviews.component';
import { Xacthuc } from './home/User/xacthuc';
import { RegisterComponent } from './home/User/register/register.component';

// const routes: Routes = [
//   { path: 'home', component: HomeComponent, children: [
//     // Các route của home
//     { path: '', redirectTo: 'home', pathMatch: 'full' },
//     { path: 'list', component: ListProductComponent },
//     { path: 'user/updatePW/:id', component: CapNhatMKComponent },
//     { path: 'user/updateUser/:id', component: CapNhatUserComponent },
//     { path: 'user/viewOH/:id', component: ViewOrderHistoryComponent },
//     { path: 'product/category/:category_id', component: FilterByCategoryComponent }, 
//     { path: 'product/category/:category_id/brand/:brand_id', component: FilterByBrandComponent }, 
//     { path: 'product/search', component: ListProductComponent}, 
//     { path: 'product/:product_id', component: DetailProductComponent },
//   ]},
// ];

const routes: Routes = [


  { path: '', redirectTo: '/home/list', pathMatch: 'full' }, // Route mặc định
  { path: 'home', component: HomeComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' }, // Route mặc định của home
    { path: 'login', component: LoginComponent },
    { path: 'list', component: ListProductComponent },
    { path: 'product/category/:category_id', component: FilterByCategoryComponent }, 
    { path: 'product/category/:category_id/brand/:brand_id', component: FilterByBrandComponent }, 
    { path: 'product/search', component: ListProductComponent}, 
    { path: 'product/detail/:product_id', component: DetailProductComponent },
    { path: 'user/register', component: RegisterComponent },



    
  
    
  ]},
  { path: 'home', component: HomeComponent,canActivate: [Xacthuc], children: [

    { path: 'order/listOrder', component: ListOrderComponent },
    { path: 'order/detailOrder/:id', component: DetailOrderComponent },
    { path: 'user/updatePW/:id', component: CapNhatMKComponent },
    { path: 'user/updateUser/:id', component: CapNhatUserComponent },
    { path: 'user/viewOH/:id', component: ViewOrderHistoryComponent },
    { path: 'product/shopping-cart', component: ShoppingCartComponent },
    { path: 'product/reviews', component: ReviewsComponent },
    { path: 'product/carts', component: ShoppingCartComponent }
    
  ]},
  { path: '**', redirectTo: '/home/list' }, // Route wildcard (404) chuyển về /home/list
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
