import { Component, OnInit, Input } from '@angular/core';
import { userService } from '../../../Service/userService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../Models/users';

@Component({
  selector: 'app-cap-nhat-mk',
  templateUrl: './cap-nhat-mk.component.html',
  styleUrls: ['./cap-nhat-mk.component.css']
})
export class CapNhatMKComponent implements OnInit {
  userId: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  @Input() user: User;

  constructor(
    private userservice: userService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];  // Lấy userId từ URL
    });

    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  isPasswordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  updatePassword(): void {
    this.userId = 1;
  
    // Kiểm tra xem người dùng đã nhập đầy đủ các trường không
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert('Vui lòng nhập các trường.');
      return;
    }
  
    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
    if (!this.isPasswordsMatch()) {
      alert('Mật khẩu mới không hợp lệÂZ.');
      return;
    }
  
    // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
    if (this.oldPassword === this.newPassword) {
      alert('Mật khẩu mới không hợp lệ.');
      return;
    }
  
    // Gửi request update mật khẩu
    const updatePasswordRequest = {
      CurrentPassword: this.oldPassword,
      NewPassword: this.newPassword
    };
  
    // Sử dụng API để cập nhật mật khẩu
    this.userservice.updatePassword(this.userId, updatePasswordRequest).subscribe(
      (response) => {
        alert('Cập nhật mật khẩu thành công.');
        // Điều hướng đến trang profile sau khi thành công (nếu cần)
        // this.router.navigate(['/profile']);
      },
      (error) => {
        alert('Error: ' + error.error);
      }
    );
  }
  
}
