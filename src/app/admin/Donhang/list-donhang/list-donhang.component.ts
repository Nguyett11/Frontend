import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../../Service/order-service';
import { userService } from '../../../Service/userService';
import { Router } from '@angular/router';
import { Order } from '../../../Models/order';
import { Console } from 'console';
import { User } from '../../../Models/users';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Service/productService';
import { OrderDetailService } from '../../../Service/order-detail-service';

@Component({
  selector: 'app-list-donhang',
  templateUrl: './list-donhang.component.html',
  styleUrl: './list-donhang.component.css'
})
export class ListDonhangComponent implements OnInit {

  @Input() DsProduct: Product[] = [];
    product_id: number;
    dangThemSua:boolean= false;
    product: Product;
    //order_id: number;
    //customer_id: number;
    status: string = "Đang xử lý";
    //create_at: Date;
    //total_amount: number;
      order: Order;
      price: number;
      number_of_products: number =1;
      total_money: number;
      user:User;
    //user_id:number;
    //customer_name:string;

    orderStatuses: { [key: string]: string[] } = {  // Định nghĩa trạng thái tiếp theo hợp lệ cho từng trạng thái hiện tại
      'Đang xử lý': ['Đã xác nhận', 'Đã hủy', 'Vấn đề trong xử lý'],
      'Đã xác nhận': ['Đang vận chuyển', 'Đã hủy', 'Vấn đề trong xử lý'],
      'Đang vận chuyển': ['Đã giao', 'Vấn đề trong xử lý'],
      'Đã giao': ['Trả hàng'],
      'Trả hàng': ['Đã hoàn tiền'],
      'Đã hoàn tiền': [],
      'Đã hủy': [],
      'Vấn đề trong xử lý': []
    };

  constructor(
    private orderService: OrderService,
    private router: Router,
    private UserService: userService,
    private productService: ProductService,
    private orderDetailService: OrderDetailService
  ){ }
  DSDonHang: any=[];
  DSUser: any=[];
  order_id: number;
  order_status: string;
  create_at: Date; 
  total_amount: number;
  customer_id: number;
  user_id: number;
  username: string;
  donhang: Order;
  selected: any = null;
  customer_name: string;
  orderSearch: any[] = [];
  searchText: string = '';

  selectedStatus: string;

  ngOnInit(): void {
      this.tailaiDSDonhang();

      this.layDSProduct();
    this.layDetailsSP(this.product_id);
    this.layDSUser();

    //Lấy thông tin người dùng và gán customer_id
    // const currentUser = this.UserService.getCurrentUser();  
    // if (currentUser) {
    //   this.user_id = currentUser.user_id;  
    //   this.customer_name = currentUser.username;
    //   console.log("iddd",this.user_id);
    // } else {
    //   console.log('Không có người dùng đăng nhập'); 
    // }
  }

  tailaiDSDonhang(){
    this.orderService.getOrders().subscribe(data =>{
      this.DSDonHang = data;
      this.DSDonHang.forEach(donhang => {
      donhang.create_at = this.formatDate(donhang.create_at);
      this.UserService.getUserById(donhang.customer_id).subscribe(user => {
        console.log("iddd",donhang.customer_id);
        donhang.customer_name = user.username;
      });
    });
    })
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  editDonhang(donhang){
    this.selected = donhang;
    this.customer_id = this.selected.customer_id ;
    this.customer_name = this.selected.customer_name; 
    this.order_status = this.selected.order_status;
    this.create_at = this.selected.create_at;

    this.total_amount = this.selected.total_amount;
  }


  viewOrderDetails(Id: number): void {
    this.router.navigate(['home/order/detailOrder/', Id]);
  }

  timkiem() {
    if (this.searchText.trim()) {
      this.orderService.timkiem(this.searchText).subscribe({
        next: (orderSearch) => {
          // First, filter orders based on `order_id` or `customer_name` (if available)
          this.orderSearch = orderSearch.filter(order => 
            order.order_id.toString().includes(this.searchText.trim())
            
            );
           
          this.orderSearch.forEach(order => {
            if (!order.customer_name) { // If the customer name isn't already available
              this.UserService.getUserById(order.customer_id).subscribe(user => {
                order.customer_name = user.username;
                order.create_at = this.formatDate(order.create_at); // Add the customer name to the order object
                
                console.log(orderSearch);
              });
            }
          });
        },
        error: (err) => {
          console.error('Đã xảy ra lỗi khi tìm kiếm:', err);
        }
      });
    } else {
      this.orderSearch = []; 
    }
  }
  

  
  layDSProduct(){
    this.productService.getProducts().subscribe(data => {
      // this.DsProduct = data;
      this.DsProduct = data.map((product) => ({ ...product, selected: false, quantity: 0 }));
    });
  }

  layDSUser() {
    this.UserService.getUsers().subscribe(data => {
      this.DSUser = data; // Gán dữ liệu lấy được vào DSProduct
    });
  }

  // Lấy chi tiết sản phẩm theo ID
  layDetailsSP(id: number): void {
    if (!id) return; // Kiểm tra nếu ID không hợp lệ
    this.productService.getProductDetails(id).subscribe({
      next: (data) => {
        this.product = data; // Lưu thông tin chi tiết sản phẩm
        this.price = data.price; // Lấy giá sản phẩm
        this.total_amount = this.price; // Cập nhật tổng tiền
        // console.log('Chi tiết sản phẩm:', this.product);
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
      }
    });
  }

    
  dong(){
    this.dangThemSua=false;
    // this.layDSTour();
  }

  themDon(){
    this.order={
      order_id:0,
      customer_id:0,
      order_status: "",
      create_at: null,
      total_amount: 0
    }
    this.dangThemSua=true;
  }


  
}
