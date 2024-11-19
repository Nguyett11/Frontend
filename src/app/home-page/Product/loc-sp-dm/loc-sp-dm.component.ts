import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../Service/productService'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../Models/brand'; 
import { Product } from '../../../Models/product';
import { categoryService } from '../../../Service/categoryService';
import { Subscription } from 'rxjs'; 
import { BrandService } from '../../../Service/brand-service';

@Component({
  selector: 'app-loc-sp-dm',
  templateUrl: './loc-sp-dm.component.html',
  styleUrl: './loc-sp-dm.component.css'
})
export class LocSPDMComponent {
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private categoryService: categoryService, private brandService: BrandService, private router: Router
  ) {}

  DsSP:Product[] = [];
  product:Product;
  DsTH: Brand[] = [];
  brand: Brand;
  private routeSub: Subscription;

  ngOnInit(){
    // this.routeSub = this.route.paramMap.subscribe(params => {
    //   const Id = Number(params.get('category_id')); // Lấy ID danh mục từ URL
    //   if ()
    //   this.laySPByDM(Id); 
    //   this.laySP_idDM(Id);
    // });
    // Lắng nghe các thay đổi trên URL và xử lý tương ứng
    this.routeSub = this.route.paramMap.subscribe(params => {
      const categoryId = params.get('category_id');
      const searchText = params.get('searchText');
      if (categoryId) {
        const id = Number(categoryId);
        this.laySPByDM(id);
        this.laySP_idDM(id);
      } else if (searchText) {
        this.searchProducts(searchText);
      }
    });
  }

  laySPByDM(id:number){
    this.productService.getByIdDM(id)
      .subscribe({
        next: (products) => {
          this.DsSP = products;
          this.DsSP.forEach(product => {
            product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url ;
          });
        //   this.categoryService.getCategoryDetails(id).subscribe(dm => {
        //     this.product.category_id = dm.category_name;
        // });
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

  //Lấy thương hiệu theo id danh mục
  laySP_idDM(id: number) {
    this.brandService.getBrand_idDM(id)
      .subscribe({
        next: (brands) => {
          this.DsTH = brands; 
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

  // Hàm tìm kiếm sản phẩm theo searchText
  searchProducts(searchText: string): void {
    this.productService.getProductsByPriceCategory(searchText)
      .subscribe({
        next: (products) => {
          this.DsSP = products;
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

  // Phương thức gọi khi người dùng chọn lọc giá
  onFilterChange(event: any): void {
    const priceCategory = event.target.value;  // Lấy giá trị từ dropdown
    if (priceCategory) {
      // Cập nhật URL với tham số searchText
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { searchText: priceCategory },
        queryParamsHandling: 'merge'  // Giữ các query params cũ (nếu có)
      });
    } else {
      // Nếu không chọn giá trị lọc (Lọc trở lại tất cả)
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { searchText: '' },
        queryParamsHandling: 'merge'
      });
    }
  }

   // Hàm lấy sản phẩm theo category giá
  //  getProductsByPriceCategory(priceCategory: string): void {
  //   this.productService.getProductsByPriceCategory(priceCategory).subscribe({
  //     next: (data) => {
  //       this.DsSP = data;
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);
  //     }
  //   });
  // }



  // layDSTH(){
  //   this.brandService.getBrand().subscribe(data => {
  //     this.DsTH = data;
  //   });
  // }

  // laySPByTH(id:number){
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

   
}
