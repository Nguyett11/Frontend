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
  productSearch: Product[] = [];
  product:Product;
  searchText:string;

  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 4; // Number of products per page
  totalPages: number = 0;
  
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

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end); // Pagination should be on 'products'
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Lấy danh sách sản phẩm từ ProductService
  layDSProduct() {
    this.productService.getProducts().subscribe(data => {
      this.DSProduct = data; // Gán dữ liệu lấy được vào DSProduct
      this.products = this.DSProduct.map(product => {
        product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url; // Gán ảnh cho mỗi sản phẩm
        return product; // Trả về mỗi sản phẩm đã được cập nhật ảnh
      });
      this.totalPages = Math.ceil(this.products.length / this.pageSize); // Pagination based on 'products'
      this.updatePagination(); // Update pagination based on 'products'
    });
  }

  // timkiem() {
  //   this.productService.timkiem(this.searchText)
  //     .subscribe({
  //       next: (productSearch) => {
  //         this.products = productSearch;
  //         this.products.forEach(product => {
  //           product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Đã xảy ra lỗi khi tìm kiếm tour:', err);
  //       }
  //     });
  // }

  timkiem() {
    this.productService.timkiem(this.searchText).subscribe({
      next: (productSearch) => {
        this.productSearch = productSearch.map(product => {
          product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
          return product;
        });
        this.totalPages = Math.ceil(this.productSearch.length / this.pageSize); // Recalculate total pages after search
        this.currentPage = 1; // Reset to the first page after search
        this.updatePagination();
      },
      error: (err) => {
        console.error('Đã xảy ra lỗi khi tìm kiếm sản phẩm:', err);
      }
    });
  }
}
