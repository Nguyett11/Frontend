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
  category: Categories | null = null;
  categories: Categories[] = [];

  constructor(private userService: userService, private router: Router,
    private route: ActivatedRoute,
    private categoryService:categoryService
  ){};

  ngOnInit(): void {
    // this.getCategories();
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.category_id = orderId;
    // if (orderId) {
    //   this.getcategoryId(orderId);
    // }
  }
  tourSearch: any[] = [];
  searchText: string = '';
  timkiem() {
    this.router.navigate(['/admin/tour/tourlist'], { queryParams: { search: this.searchText } });
  }
  navigateToHome() {
    this.router.navigate(['/home/list']);
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
