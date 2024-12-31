import { Component } from '@angular/core';
import { userService } from '../Service/userService';
import { Router } from '@angular/router';
import { User } from '../Models/users';
import { ActivatedRoute } from '@angular/router'; 
import { categoryService } from '../Service/categoryService';
import { Categories } from '../Models/categories';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  user: User | null = null; 
  message = '';
  category_id : number;
  brand_id:number;

  
  //category: Categories | null = null;
  //categories: Categories[] = [];

  constructor(private userService: userService, private router: Router,
    private route: ActivatedRoute,
    private categoryService:categoryService
  ){};

  ngOnInit(): void {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    // this.getCategories();
    const Id = Number(this.route.snapshot.paramMap.get('id'));
    this.category_id = Id;
    this.brand_id= Id;
  }
  productSearch: any[] = [];
  searchText: string = '';
  navigateToHome() {
    this.router.navigate(['/home/list']);
  }
  timkiem() {
    if (this.searchText) {
      // Chỉ thực hiện tìm kiếm nếu searchText không rỗng
      this.router.navigate(['/admin/products/list/',0], { queryParams: { search: this.searchText } });
    } else {
      // Thông báo nếu searchText rỗng
      console.log("Vui lòng nhập từ khóa tìm kiếm.");
    }
  }
  logout() {
    this.userService.logout().subscribe(
      response => {
        if (response.success) {
          this.message = response.message || 'Đăng xuất thành công.';
          // Clear user data from localStorage or sessionStorage
          localStorage.removeItem('user');
          this.user = null; // Clear user state in component
          this.router.navigate(['home/login']); // Redirect to login page
        } else {
          this.message = response.message || 'Đăng xuất thất bại.';
        }
      },
      error => {
        console.error('Logout error', error);
        this.message = 'Đăng xuất thất bại. Vui lòng thử lại.';
      }
    );
  }
  
  updatePassword() {
    this.router.navigate(['/admin/user/updatePW/', this.user.user_id]); // Đảm bảo route này tồn tại trong router module
  }

  // getCategories() {
  //   this.categoryService.getCategory().subscribe(
  //     (categories: Categories[]) => {
  //       this.categories = categories;
  //       console.log('Categories fetched successfully:', this.categories);
  //     },
  //     error => {
  //       console.error('Error fetching categories:', error);
  //     }
  //   );
  // }

  // getcategoryId(id) {
  //   this.categoryService.getCategoryDetails(id).subscribe((category: Categories) => {
  //     this.category_id = category.category_id;
  //   });
  // }

}
