import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateDonhangComponent } from './Donhang/create-donhang/create-donhang.component';
import { ListDonhangComponent } from './Donhang/list-donhang/list-donhang.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { DetailProductComponent } from './Product/detail-product/detail-product.component';
import { CreateProductComponent } from './Product/create-product/create-product.component';
import { CreateCategoriesComponent } from './Categories/create-categories/create-categories.component';
import { ListCategoriesComponent } from './Categories/list-categories/list-categories.component';
import { ListBrandsComponent } from './Brands/list-brands/list-brands.component';
import { CreateBrandsComponent } from './Brands/create-brands/create-brands.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateDonhangComponent,
    ListDonhangComponent,
    ListProductComponent,
    DetailProductComponent,
    CreateProductComponent,
    CreateCategoriesComponent,
    ListCategoriesComponent,
    ListBrandsComponent,
    CreateBrandsComponent,
    IndexComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AdminModule { }
