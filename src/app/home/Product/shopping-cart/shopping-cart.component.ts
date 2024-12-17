import { Component, OnInit } from '@angular/core';
import { shoppingCartService } from '../../../Service/shoppingCartService';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Service/productService';
import { userService } from '../../../Service/userService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = ''; // Mã giảm giá
  totalAmount: number = 0; // Tổng tiền
  cart: Map<number, number> = new Map();
  PathAnh : string;
  user_id:number;

  constructor(
    private cartService: shoppingCartService,
    private productService: ProductService,
    private userService: userService
  ) {}

  ngOnInit(): void {
     // Lấy danh sách sản phẩm từ giỏ hàng
  
    this.cart = this.cartService.getCart();
    const productIds = Array.from(this.cart.keys());
   
    if(productIds.length === 0) {
      return;
    }    
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {            
      
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId) => {
        
          const product = products.find((p) => p.product_id === productId);
          if (product) {
            this.PathAnh = this.productService.PhotosUrl + "/" + product.image_url ;
          }          
          return {
            product: product!,
            quantity: this.cart.get(productId)!
          };
        });
      },
      complete: () => {
      
        this.calculateTotal()
      },
      error: (error: any) => {
       
        console.error('Error fetching detail:', error);
      }
    }); 
    const currentUser = this.userService.getCurrentUser();  
    if (currentUser) {
      this.user_id = currentUser.user_id;  
    } else {
      console.log('Không có người dùng đăng nhập');
      
    }   
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      // Cập nhật lại this.cart từ this.cartItems
      this.updateCartFromCartItems();
      this.calculateTotal();
    }
  }
  
  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;   
    // Cập nhật lại this.cart từ this.cartItems/-strong/-heart:>:o:-((:-h this.updateCartFromCartItems();
    this.calculateTotal();
  }    

  // Hàm tính tổng tiền
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }


  // Hàm xử lý việc áp dụng mã giảm giá
  applyCoupon(): void {
      // Viết mã xử lý áp dụng mã giảm giá ở đây
      // Cập nhật giá trị totalAmount dựa trên mã giảm giá nếu áp dụng
  }

  confirmDelete(index: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      // Xóa sản phẩm khỏi danh sách cartItems
      this.cartItems.splice(index, 1);
      // Cập nhật lại this.cart từ this.cartItems
      this.updateCartFromCartItems();
      // Tính toán lại tổng tiền
      this.calculateTotal();
    }
  }

  private updateCartFromCartItems(): void {
    this.cart.clear();
    this.cartItems.forEach((item) => {
      this.cart.set(item.product.product_id, item.quantity);
    });
    this.cartService.setCart(this.cart);
  }
}