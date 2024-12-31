import { Component } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Service/productService';
import { BrandService } from '../../../Service/brand-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { categoryService } from '../../../Service/categoryService';
import { Categories } from '../../../Models/categories';
import { Brand } from '../../../Models/brand';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  list_products: Product[]= [];
  product_brand: Product[] = [];
  searchList: Product[] = [];
  product: Product;
  product_id: number;
  product_name: string;
  brand_id: number;
  category_id: number;
  price: number;
  quantity: number;
  image_url: string;
  PathAnh: string;

  searchText:string;

  selected_product: Product | null = null;

  list_brand: Brand[] = [];
  list_category: Categories[] = [];


  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 4; // Number of products per page
  totalPages: number = 0;
  constructor(private brandService: BrandService, private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: categoryService,
  ) {
    
  }

  ngOnInit(): void {

    // this.route.queryParams.subscribe(params => {
    //   const search = params['search'];
    //   if (search) {
    //     this.searchText = search;
    //     this.timkiem(); // Tìm kiếm khi có từ khóa
    //   } else {
    //     this.loadProductsByBrand(); // Tải tất cả sản phẩm nếu không tìm kiếm
    //   }
    // });
    
    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.searchText = search;
        this.timkiem();  // Perform search if query param is found
      } else {
        this.loadProductsByBrand();  // Load all products if no search query
      }
    });

    this.loadProductsByBrand();
    this.DsBrand();
    this.DsDanhMuc();
    
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.list_products.slice(start, end);
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
  
  loadProductsByBrand(): void {
    const Id = Number(this.route.snapshot.paramMap.get('id'));
    this.brand_id = Id;  
    console.log(Id);
    if (this.brand_id && this.brand_id > 0) {
      // Lấy thương hiệu theo ID danh mục
      this.productService.getByIdTH(this.brand_id).subscribe(
        (data: Product[]) => {
          this.list_products = data;
          this.product_brand = this.list_products.map(product => {
          product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url; // Gán ảnh cho mỗi sản phẩm
          return product; // Trả về mỗi sản phẩm đã được cập nhật ảnh
          });

          this.totalPages = Math.ceil(this.list_products.length / this.pageSize);
          this.updatePagination();
        },
        (error) => {
          console.error('Lỗi khi tải sản phẩm theo thương hiệu:', error);
          this.product_brand = [];
          }
       );
    } else {
        // Lấy tất cả sản phẩm nếu không có thương hiệu
      this.productService.getProducts().subscribe(
        (data: Product[]) => {
          this.list_products = data;
          this.product_brand = this.list_products.map(product => {
            console.log('image_url:', product.image_url); // Kiểm tra dữ liệu image_url
            product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
            return product;
          });

          this.totalPages = Math.ceil(this.list_products.length / this.pageSize);
          this.updatePagination();
          },
          (error) => {
            console.error('Lỗi khi tải tất cả sản phẩm:', error);
            this.product_brand = [];
          }
        );
      }
    }

    
    timkiem() {
      if (this.searchText) {
        console.log('Tìm kiếm với từ khóa:', this.searchText);
        this.productService.timkiem(this.searchText).subscribe({
          next: (productSearch) => {
            console.log('Kết quả tìm kiếm:', productSearch);
            if (productSearch.length > 0) {
              // Gán danh sách tìm kiếm vào list_products
              this.list_products = productSearch.map(product => {
                product.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
                return product;
              });
              this.totalPages = Math.ceil(this.list_products.length / this.pageSize); // Cập nhật số trang
              this.currentPage = 1; // Reset về trang đầu tiên
              this.updatePagination(); // Cập nhật danh sách hiển thị
            } else {
              console.log('Không có sản phẩm nào tìm thấy.');
              this.list_products = []; // Xóa danh sách nếu không tìm thấy sản phẩm
              this.paginatedProducts = []; // Xóa danh sách phân trang
              this.totalPages = 0; // Đặt số trang về 0
            }
          },
          error: (err) => {
            console.error('Lỗi khi tìm kiếm:', err);
          }
        });
      } else {
        console.log('Vui lòng nhập từ khóa tìm kiếm.');
      }
    }
    
    

  xoaProduct(product: Product) {
    this.productService.deleteProduct(product.product_id).subscribe(
      (data) => {
        this.loadProductsByBrand();
      }
    );
  }


  get photosUrl(): string {
    return this.productService.PhotosUrl;
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    if (!file) {
      alert('Vui lòng chọn một tệp!');
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    this.productService.taiAnh(formData).subscribe((data: any) => {
      // Assuming 'data' is the image name or URL returned from the backend
      if (data) {
        this.image_url = data.toString();  // Store the image URL returned by the backend
        console.log('Response data:', data);
        // Make sure the photosUrl is also correctly set
        this.product.PathAnh = this.productService.PhotosUrl + "/" + this.image_url;
      } else {
        alert('Lỗi tải ảnh');
      }
    }, error => {
      console.error('Lỗi upload ảnh:', error);
      alert('Không thể tải ảnh lên');
    });
  }
  

  DsDanhMuc() {
    this.categoryService.getCategory().subscribe(data => {
      this.list_category = data;
      console.log("Categories:", data);
    });
  }

  DsBrand() {
    this.brandService.getBrand().subscribe(data => {
      this.list_brand = data;
      console.log("Brands:", data);
    });
  }

  editProduct(product: Product) {
    if (!product) {
      console.error('Sản phẩm không hợp lệ:', product);
      return;
    }
    this.selected_product = { ...product }; // Create a copy to avoid directly modifying the product
    this.product_name = this.selected_product.product_name;
    this.brand_id = this.selected_product.brand_id;
    this.category_id = this.selected_product.category_id;
    this.price = this.selected_product.price;
    this.quantity = this.selected_product.quantity;
    this.image_url = this.selected_product.image_url; // Assign image_url from selected product
  
    // Update PathAnh to display the product's image
    if (this.selected_product && this.selected_product.image_url) {
      this.selected_product.PathAnh = this.productService.PhotosUrl + "/" + this.selected_product.image_url;
    } else {
      this.selected_product.PathAnh = ''; // Default empty or placeholder if no image
    }
  }
  
  
  
  suaProduct() {
    if (!this.selected_product || !this.selected_product.product_id) {
      console.error('product chưa được chọn hoặc không hợp lệ.');
      return;
    }
  
    const val = {
      product_id: this.selected_product.product_id,
      product_name: this.product_name,
      brand_id: this.brand_id,
      category_id: this.category_id,
      price: this.price,
      quantity: this.quantity,
      image_url: this.image_url, // Include the updated image_url
    };
    console.log(val);
  
    this.productService.updateProduct(this.selected_product.product_id, val).subscribe(
      response => {
        this.loadProductsByBrand();  // Reload products after update
        console.log('Sửa thành công:', response);
        alert('Sửa sản phẩm thành công!');
      },
      error => {
        console.error('Có lỗi khi sửa sản phẩm!', error);
        if (error.error) {
          console.error('Chi tiết lỗi:', error.error);
        }
      }
    );
  }
  
}
