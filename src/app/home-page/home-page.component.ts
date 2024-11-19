import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../Service/productService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Models/users'; 
import { Product } from '../Models/product'; 
import { categoryService } from '../Service/categoryService';
import { Categories } from '../Models/categories';
import { DOCUMENT, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router : Router, private productService: ProductService, private route: ActivatedRoute,
    private categoryService: categoryService
  ) {}

  products:Product[] = [];
  product:Product;
  DsDM : Categories[] = [];

  ngOnInit(){
    //const Id = Number(this.route.snapshot.paramMap.get('id'));
    this.DsDanhMucSp();
    //this.layTourByDM(Id);
    //this.layTourByTH(Id);
  }

  DsDanhMucSp() {
    this.categoryService.getCategory().subscribe(data => {
      this.DsDM = data;
    });
  }
 searchText: string = '';

 timkiem() {
  if (this.searchText) {
    // Chỉ thực hiện tìm kiếm nếu searchText không rỗng
    this.router.navigate(['Products/search/'], { queryParams: { search: this.searchText } });
  } else {
    // Thông báo nếu searchText rỗng
    console.log("Vui lòng nhập từ khóa tìm kiếm.");
  }
}


  // layTourByDM(id:number){
  //   this.productService.getByIdDM(1)
  //     .subscribe({
  //       next: (products) => {
  //         this.products = products;
  //         this.products.forEach(product => {
  //           product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url ;
  //         });
  //       //   this.categoryService.getCategoryDetails(id).subscribe(dm => {
  //       //     this.product.category_id = dm.category_name;
  //       // });
  //       },
  //       error: (err) => {
  //         console.error('Error:', err);
  //       }
  //     });
  // }

  // layTourByTH(id:number){
  //   this.productService.getByIdTH(2)
  //     .subscribe({
  //       next: (products) => {
  //         this.products = products;
  //         this.products.forEach(product => {
  //           product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url ;
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Error:', err);
  //       }
  //     });
  // }


  login(){
    this.router.navigate(['login/']);
  }
}
