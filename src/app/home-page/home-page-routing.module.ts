import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HomeIndexComponent } from './home-index/home-index.component';

import { LocSPDMComponent } from './Product/loc-sp-dm/loc-sp-dm.component';
import { LocSpThComponent } from './Product/loc-sp-th/loc-sp-th.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

// const routes: Routes = [
//   {
//     path: '', component: HomePageComponent, children: [
//     { path: '', component:  HomeIndexComponent},
//     { path: 'category/:id', component:  LocSPDMComponent},
//     { path: 'brand/ByIDCategory/:id', component:  LocSpThComponent}
//     ]
    
//   }, 
// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
