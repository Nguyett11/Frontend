import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Service/productService';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loc-sp-th',
  templateUrl: './loc-sp-th.component.html',
  styleUrls: ['./loc-sp-th.component.css']
})
export class LocSpThComponent implements OnInit {
  DsSP: Product[] = [];
  product : Product;
  private routeSub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lấy cả category_id và brand_id từ URL
    this.routeSub = this.route.paramMap.subscribe(params => {
      const categoryId = Number(params.get('category_id'));
      const brandId = Number(params.get('brand_id'));
      // Gọi hàm lấy sản phẩm với category_id và brand_id
      this.getProducts(categoryId, brandId);
    });
  }

  getProducts(category_id: number, brand_id: number) {
    this.productService.getProductsByCategoryAndBrand(category_id, brand_id).subscribe({
      next: (products) => {
        console.log('Fetched products:', products);  // Log để kiểm tra
        this.DsSP = products;
        this.DsSP.forEach(product => {
          product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // laySPByDM(id:number){
  //   this.productService.getByIdDM(id)
  //     .subscribe({
  //       next: (products) => {
  //         this.products = products;
  //         this.products.forEach(product => {
  //           product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url ;
  //         });
  //         this.categoryService.getCategoryDetails(id).subscribe(dm => {
  //           this.product.category_id = dm.category_name;
  //       });
  //       },
  //       error: (err) => {
  //         console.error('Error:', err);
  //       }
  //     });
  // }
  

  // ngOnDestroy(): void {
  //   if (this.routeSub) {
  //     this.routeSub.unsubscribe(); // Hủy subscription khi component bị hủy
  //   }
  // }
}
