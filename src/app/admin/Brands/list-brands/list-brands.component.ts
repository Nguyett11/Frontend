import { Component } from '@angular/core';
import { BrandService } from '../../../Service/brand-service';
import { Brand } from '../../../Models/brand';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { categoryService } from '../../../Service/categoryService';
import { Categories } from '../../../Models/categories';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrl: './list-brands.component.css'
})
export class ListBrandsComponent {

  list_brand: any[] = [];
  brand: Brand;
  brand_name: string;
  brand_id: number;
  them: boolean = false;
  selected_brand: any = null;
  category_id:number;
  categories: Categories[];
  brand_category: any[] = [];
  constructor(private brandService: BrandService, private router: Router,
    private route: ActivatedRoute,
    private categoryService: categoryService
  ) {
    
  }

  ngOnInit(): void {
    this.loadBrandsByCategory();
  }


  
    loadBrandsByCategory(): void {
      const DMId = Number(this.route.snapshot.paramMap.get('id'));
      this.category_id = DMId;  
      if (this.category_id && this.category_id > 0) {
        // Lấy thương hiệu theo ID danh mục
        this.brandService.getBrand_idDM(this.category_id).subscribe(
          (data: Brand[]) => {
            this.brand_category = data;
          },
          (error) => {
            console.error('Lỗi khi tải thương hiệu theo danh mục:', error);
            this.brand_category = [];
          }
        );
      } else {
        // Lấy tất cả thương hiệu nếu không có danh mục
        this.brandService.getBrand().subscribe(
          (data: Brand[]) => {
            this.brand_category = data;
          },
          (error) => {
            console.error('Lỗi khi tải tất cả thương hiệu:', error);
            this.brand_category = [];
          }
        );
      }
    }


  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand.brand_id).subscribe(
      (data) => {
        this.loadBrandsByCategory();
      }
    );
  }

  editBrand(brand: Brand) {
    this.selected_brand = brand;
    this.brand_name = brand ? brand.brand_name: '';
  }

  suaBrand() {
    if (!this.selected_brand || !this.selected_brand.brand_id) {
      console.error('Danh mục chưa được chọn hoặc không hợp lệ.');
      return;
    }

    this.category_id = this.selected_brand.category_id || this.category_id;
    const val = { brand_id: this.selected_brand.brand_id, brand_name: this.brand_name, category_id: this.category_id  };
    console.log(val);
    this.brandService.updateBrand(this.selected_brand.brand_id, val).subscribe(
      response => {
        this.loadBrandsByCategory();
        alert('Sửa thương hiệu thành công!');
      },
      error => {
        console.error('Có lỗi khi sửa thương hiệu !', error);
        if (error.error) {
          console.error('Chi tiết lỗi:', error.error);
        }
      }
    );
  }

  dong() {
    this.them = false;
    this.loadBrandsByCategory();
  }

}
