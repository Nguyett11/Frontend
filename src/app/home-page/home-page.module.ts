import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Chỉ cần import một lần tại đây

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';
import { CapNhatMKComponent } from './Users/cap-nhat-mk/cap-nhat-mk.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocSPDMComponent } from './Product/loc-sp-dm/loc-sp-dm.component';
import { LocSpThComponent } from './Product/loc-sp-th/loc-sp-th.component';
import { RouterModule } from '@angular/router';
import { ChitietSpComponent } from './Product/chitiet-sp/chitiet-sp.component';
import { OrderDetailsComponent } from './Order/order-details/order-details.component';
import { ListOrdersComponent } from './Order/list-orders/list-orders.component';
import { LoginComponent } from './Users/login/login.component';
import { DanhSachSPComponent } from './Product/ds-sp/ds-sp.component';

@NgModule({
  declarations: [
    HomeIndexComponent,
    CapNhatMKComponent,
    LocSPDMComponent,
    LocSpThComponent,
    ChitietSpComponent,
    OrderDetailsComponent,
    ListOrdersComponent,
    LoginComponent,
    DanhSachSPComponent
  ],
  imports: [
    CommonModule,  // Đảm bảo CommonModule được thêm vào imports
    HomePageRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class HomePageModule { 

}
