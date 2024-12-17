import { Component } from '@angular/core';
import { userService } from '../../../Service/userService';
import { User } from '../../../Models/users'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  message = '';
  user: User | null = null;  // Initialize user as null

  constructor(private userService: userService, private router: Router) {}

  // Login() {
  //   this.userService.login(this.username, this.password).subscribe(
  //     response => {
  //       if (response.success) {
  //         // Check if response.user exists and is a valid User object
  //         if (response.user && typeof response.user === 'object') {
  //           this.user = response.user;  // Assign user object
  //           console.log("Login successful");
  //           // Ensure role_id is a number (convert if it's a string)
  //           const roleId = Number(this.user.role_id); // Ensure role_id is a number
  //           this.userService.setCurrentUser(user);  // Lưu thông tin người dùng sau khi đăng nhập

  //           // Differentiate based on user role (role_id)
  //           if (roleId === 1) {
  //             this.message = 'Đăng nhập thành công với quyền Admin';
  //             this.router.navigate(['/admin/']); // Navigate to admin page
  //           } else if (roleId === 2) {
  //             this.message = 'Đăng nhập thành công với quyền User';
  //             this.router.navigate(['/home/list']); // Navigate to user page
  //           } else {
  //             this.message = 'Lỗi: role_id không hợp lệ';
  //           }

  //           // Optionally, store user data in localStorage or sessionStorage
  //           localStorage.setItem('user', JSON.stringify(this.user)); // Store user data
  //         } else {
  //           this.message = 'Dữ liệu người dùng không hợp lệ';
  //         }
  //       } else {
  //         this.message = response.message || 'Đăng nhập thất bại.';
  //       }
  //     },
  //     error => {
  //       console.error('Login error', error);
  //       this.message = 'Đăng nhập thất bại. Vui lòng thử lại.';
  //     }
  //   );
  // }

  Login() {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          // Check if response.user exists and is a valid User object
          if (response.user && typeof response.user === 'object') {
            this.user = response.user;  // Assign user object
            console.log("Login successful");
            
            // Ensure role_id is a number (convert if it's a string)
            const roleId = Number(this.user.role_id); // Ensure role_id is a number
            
            // Save user info after login
            this.userService.setCurrentUser(this.user);  // Use this.user instead of 'user'
  
            // Differentiate based on user role (role_id)
            if (roleId === 1) {
              this.message = 'Đăng nhập thành công với quyền Admin';
              this.router.navigate(['/admin']  ); // Navigate to admin page
            } else if (roleId === 2) {
              this.message = 'Đăng nhập thành công với quyền User';
              this.router.navigate(['/home/list']); // Navigate to user page
            } else {
              this.message = 'Lỗi: role_id không hợp lệ';
            }
  
            // Optionally, store user data in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(this.user)); // Store user data
          } else {
            this.message = 'Dữ liệu người dùng không hợp lệ';
          }
        } else {
          this.message = response.message || 'Đăng nhập thất bại.';
        }
      },
      error => {
        console.error('Login error', error);
        this.message = 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    );
  }
  

  logout() {
    this.userService.logout().subscribe(
      response => {
        if (response.success) {
          this.message = response.message || 'Đăng xuất thành công.';
          // Clear user data from localStorage or sessionStorage
          localStorage.removeItem('user');
          this.user = null; // Clear user state in component
          this.router.navigate(['/login']); // Redirect to login page
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
}
