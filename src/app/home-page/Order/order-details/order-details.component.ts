import { Component } from '@angular/core';
import { OrderDetailService } from '../../../Service/order-detail-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../../Models/order-details';
import { User } from '../../../Models/users';
import { userService } from '../../../Service/userService';
import { Product } from '../../../Models/product';
import { OrderService } from '../../../Service/order-service';
import { ProductService } from '../../../Service/productService';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {


  customer_name: string;
  PathAnh: string;
  product_name:string;
  product: Product;
  orderDetails: OrderDetails;
  order_status: string;
  id_customer: number;

  constructor(
    private order_detailService: OrderDetailService, 
    private productService :ProductService ,
    private orderService: OrderService,
    private router: Router, 
    private route: ActivatedRoute,
    private _userService: userService
  ) {}

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (orderId) {
      this.loadOrderDetails(orderId);

    } else {
      console.error("Lỗi! ID is invalid or not found.");
    }
  }

  

  loadOrderDetails(id: number): void {
    console.log('hiện dữ liệu',id);
    this.order_detailService.getOrderDetailById(id).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.orderDetails = data[0]; 
           this.orderDetails[id] = data; // Lưu sản phẩm vào đối tượng `products` theo product_id
        } else {
          console.error('Không có dữ liệu cho đơn hàng này.');
        }
        this.loadProducts(this.orderDetails.product_id);
        this.loadOrder(this.orderDetails.order_id);
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
      }
    });
  }
  

  loadUser(id:number){
    this._userService.getUserByID(id).subscribe({
      next: (user) => {
        this.loadOrder(this.id_customer);
      
        this.customer_name = user.username;
        //this.id_customer =this.customer_name;
        console.log("name", this.customer_name);
      },
      error: (err) => {
        console.error(`Lỗi khi lấy user với ID ${id}:`, err);
      }
    });
  }
  

  loadProducts(id: number): void {
    this.productService.getProductDetails(id).subscribe({
      next: (product) => {
       //this.img = product.image_url;
       this.PathAnh = this.productService.PhotosUrl + "/" + product.image_url;
        this.product_name = product.product_name;
      },
      error: (err) => {
        console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, err);
      }
    });
  }


  loadOrder(id:number):void{
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order_status = order.order_status;
        this.id_customer = order.customer_id;
      },
      error: (err) => {
        console.error(`Lỗi khi lấy order với ID ${id}:`, err);
      }
    });

  }

  huyOrderDetail(orderId: OrderDetails) {
    this.orderService.deleteOrder(orderId.order_id).subscribe(
      (data) => {
  
        // Redirect to the order list or confirmation page after cancellation
        this.router.navigate(['/admin']); // Navigate back to the order list page if needed
      },
      (error) => {
        console.error('Error canceling order:', error);
        // Optionally, handle the error and show an error message
      }
    );
  }
  



  // Navigate back to the order list page
  goBackToOrderList(): void {
    this.router.navigate(['/admin']); // Assuming the route for order list is '/order-list'
  }
}