import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LocSpThComponent } from './home-page/Product/loc-sp-th/loc-sp-th.component';
import { HomeIndexComponent } from './home-page/home-index/home-index.component';
import { LocSPDMComponent } from './home-page/Product/loc-sp-dm/loc-sp-dm.component';
import { ChitietSpComponent } from './home-page/Product/chitiet-sp/chitiet-sp.component';
import { CapNhatThongTinComponent } from './home-page/Users/cap-nhat-thong-tin/cap-nhat-thong-tin.component';
 import { DanhSachSPComponent } from './home-page/Product/ds-sp/ds-sp.component';
 import { LoginComponent } from './home-page/Users/login/login.component';

// const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
//   },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'brand/:id', component:  LocSpThComponent}
// ];

const routes: Routes = [
  { 
    path: 'home', 
    component: HomePageComponent, 
    children: [
      // { path: '', component: HomeIndexComponent },  
      // { path: 'index', component: HomeIndexComponent }, 
      { path: 'listProduct', component: DanhSachSPComponent },   
      { path: 'categories/:category_id', component: LocSPDMComponent }, 
      { path: 'categories/:category_id/brands/:brand_id', component: LocSpThComponent },  
      { path: 'productDetails/:product_id', component: ChitietSpComponent },
      { path: 'Products/danhsachsp', component: DanhSachSPComponent},
      { path: 'updateUser/1', component: CapNhatThongTinComponent},
      { path: 'Products/search', component: DanhSachSPComponent},
      { path: 'login', component: LoginComponent },
    ]
  },
   { path: '**', redirectTo: '/home/listProduct' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
