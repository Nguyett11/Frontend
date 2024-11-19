import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Thêm dòng này

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocSPDMComponent } from './home-page/Product/loc-sp-dm/loc-sp-dm.component';
import { DOCUMENT, NgFor } from '@angular/common';
import { LocSpThComponent } from './home-page/Product/loc-sp-th/loc-sp-th.component';
import { CapNhatThongTinComponent } from './home-page/Users/cap-nhat-thong-tin/cap-nhat-thong-tin.component'; 
import { DanhSachSPComponent } from './home-page/Product/ds-sp/ds-sp.component';
import { ListOrdersComponent } from './home-page/Order/list-orders/list-orders.component';
import { OrderDetailsComponent } from './home-page/Order/order-details/order-details.component';
import { LoginComponent } from './home-page/Users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent, 
    LocSPDMComponent,
    LocSpThComponent,
    CapNhatThongTinComponent,
    DanhSachSPComponent,
    ListOrdersComponent ,
    OrderDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // Thêm dòng này vào
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgFor,
    RouterModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
