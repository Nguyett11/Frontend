import { Component, Input } from '@angular/core';
import { Order } from '../../../Models/order';
import { OrderService } from '../../../Service/order-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../../Models/order-details';
import { User } from '../../../Models/users';
import { userService } from '../../../Service/userService';


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent {

  user_id: string;
  username: string;
  orders: Order[] = [];
  order_details: OrderDetails[] = [];
  order_custommer: User[] = [];
  @Input() user: User[] = [];

  constructor(
    private orderService: OrderService, 
    private router: Router, 
    private route: ActivatedRoute,
    private _userService: userService
  ) {}

  ngOnInit() {
    this.layOrder();
  }

  layOrder() {
    this.orderService.getOrders().subscribe(
      data => {
        this.orders = data;
        if (Array.isArray(data) && data.length > 0) {
          const customerId = data[0].customer_id;
         
          this._userService.getUserByID(customerId).subscribe(us => {
            this.username = us.username;
          });
        }
      },
      error => {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    );
  }

  viewOrderDetails(Id: number): void {
    this.router.navigate(['admin/orderdetail/', Id]);
  }

  // huyOrderDetail(orderId: OrderDetails) {
  //   this.productService.deleteOrder(orderId.order_id).subscribe(
  //     (data) => {
  //       console.log('Order canceled successfully:', data);
        
  //       // Remove the order from the `orders` list
  //       this.orders = this.orders.filter(order => order.order_id !== orderId.order_id);
  
  //       // If you also have a separate list for `order_details`, update it as well
  //       this.order_details = this.order_details.filter(detail => detail.order_id !== orderId.order_id);
  
  //       // Optionally, navigate to another page or refresh view
  //       this.router.navigate(['/admin']);
  //     },
  //     (error) => {
  //       console.error('Error canceling order:', error);
  //       // Optionally, handle the error and show an error message
  //     }
  //   );
  // }
}
