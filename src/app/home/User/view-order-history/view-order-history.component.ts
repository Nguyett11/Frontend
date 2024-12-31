import { Component } from '@angular/core';
import { Order } from '../../../Models/order';
import { ActivatedRoute } from '@angular/router';
import { userService } from '../../../Service/userService';
import { Router } from '@angular/router';
import { OrderService } from '../../../Service/order-service';
import { OrderDetailService } from '../../../Service/order-detail-service';
import { OrderDetails } from '../../../Models/order-details';
import { User } from '../../../Models/users';
import { ProductService } from '../../../Service/productService';
import { Product } from '../../../Models/product';


@Component({
  selector: 'app-view-order-history',
  templateUrl: './view-order-history.component.html',
  styleUrl: './view-order-history.component.css'
})
export class ViewOrderHistoryComponent {

  order_id : number;
  order : Order = new Order();
  orderDetail : OrderDetails = new OrderDetails();
  user_name: string;
  phone: string;
  create_at: Date;
  number: number;
  PathAnh:string;
  product_name:string;
  status:string;
  total_money: number;
  message = '';
  user: User | null = null; 
  user_id: number;

  constructor(
    private route: ActivatedRoute,
    private userServices: userService,
    private router: Router,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(+idParam)) {
      console.error('Invalid or missing ID:', idParam);
      alert('Invalid or missing ID. Please check the URL.');
      return;
    }
  
    const id = +idParam; // Chuyển đổi sang số sau khi kiểm tra hợp lệ
    console.log(id);
  
    // Gọi các hàm xử lý logic sau khi xác thực ID
    this.fetchOrderData(id);
  }

  private fetchOrderData(customerId: number): void {
    this.orderService.getOrderByCustomerId(customerId).subscribe(
      (data: Order) => {
        console.log(data); // Kiểm tra dữ liệu trả về
        this.create_at = data.create_at;
        this.order_id = data.order_id;
        this.status = data.order_status;
        this.total_money = data.total_amount;
  
        this.fetchUserAndOrderDetails(data.customer_id);
      },
      (error) => {
        console.error('Error fetching orders:', error);
        alert('Unable to fetch orders data. Please try again later.');
      }
    );
  }
  
  private fetchUserAndOrderDetails(customerId: number): void {
    this.userServices.getUserById(customerId).subscribe(
      (user: User) => {
        this.user_name = user.username;
        this.phone = user.phone;
        this.user_id = user.user_id;
  
        if (!this.order_id) {
          console.error('Invalid order_id:', this.order_id);
          alert('Order ID is missing or invalid.');
          return;
        }
  
        this.orderDetailService.getOrderDetailById(this.order_id).subscribe(
          (details: OrderDetails) => {
            console.log(details);
            this.orderDetail = details;
            this.number = details.number_of_products;
  
            this.productService.getProductDetails(details.product_id).subscribe(
              (product: Product) => {
                this.PathAnh = this.productService.PhotosUrl + '/' + product.image_url;
                this.product_name = product.product_name;
              }
            );
          },
          (error) => {
            console.error('Error fetching order details:', error);
            alert('Unable to fetch order details. Please try again later.');
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
        alert('Unable to fetch user data. Please try again later.');
      }
    );
  }
  
  // ngOnInit(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   if (isNaN(id) || id <= 0) {
  //     console.error('Invalid ID:', id);
  //     alert('Invalid ID. Please check the URL.');
  //     return;
  //   }
  //   console.log(id);
  
  //   this.orderService.getOrderByCustomerId(id).subscribe(
  //     (data: Order) => {
  //       console.log(data); // Kiểm tra dữ liệu trả về
  
  //       this.create_at = data.create_at;
  //       this.order_id = data.order_id;
  //       this.status = data.order_status;
  //       this.total_money = data.total_amount;
  
        
  //       console.log('Order ID:', this.order_id);
  
  //       this.userServices.getUserById(data.customer_id).subscribe(
  //         (user: User) => {
  //           this.user_name = user.username;
  //           this.phone = user.phone;
  //           this.user_id = user.user_id;
  
  //           // Kiểm tra lại order_id trước khi gọi API chi tiết đơn hàng
  //           if (!this.order_id) {
  //             console.error('Invalid order_id:', this.order_id);
  //             alert('Order ID is missing or invalid.');
  //             return;
  //           }
  
  //           this.orderDetailService.getOrderDetailById(this.order_id).subscribe(
  //             (details: OrderDetails) => {
  //               console.log(details);
  //               this.orderDetail = details;
  //               this.number = details.number_of_products;
                
  //               this.productService.getProductDetails(details.product_id).subscribe(
  //                 (product: Product) => {
  //                   this.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
  //                   this.product_name = product.product_name;
  //                 }
  //               );
  //             },
  //             (error) => {
  //               console.error('Error fetching order details:', error);
  //               alert('Unable to fetch order details. Please try again later.');
  //             }
  //           );
  //         } // <== Đây là dấu ngoặc kết thúc callback của getUserById()
  //       ); // <== Đây là dấu ngoặc đóng của subscribe() trong userServices
  //     },
  //     (error) => {
  //       console.error('Error fetching orders:', error);
  //       alert('Unable to fetch orders data. Please try again later.');
  //     }
  //   );
  // }
  
  logout() {
    this.userServices.logout().subscribe(
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

}
