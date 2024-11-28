import { Component } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Service/productService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  DSProduct: Product[] = [];
  products: Product[] = [];
  product:Product;
  searchText:string;

  
  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  // Hàm được gọi khi component được khởi tạo
  ngOnInit() {
    this.layDSProduct(); // Gọi hàm tải sản phẩm khi component khởi tạo
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || '';
      this.timkiem();
      console.log(this.searchText);
    });
  }

  // Lấy danh sách sản phẩm từ ProductService
  layDSProduct() {
    this.productService.getProducts().subscribe(data => {
      this.DSProduct = data; // Gán dữ liệu lấy được vào DSProduct
      this.products = this.DSProduct.map(product => {
        product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url; // Gán ảnh cho mỗi sản phẩm
        return product; // Trả về mỗi sản phẩm đã được cập nhật ảnh
      });
    });
  }

  timkiem() {
    this.productService.timkiem(this.searchText)
      .subscribe({
        next: (productSearch) => {
          this.products = productSearch;
          this.products.forEach(product => {
            product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
          });
        },
        error: (err) => {
          console.error('Đã xảy ra lỗi khi tìm kiếm tour:', err);
        }
      });
  }
}
