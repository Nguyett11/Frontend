import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class shoppingCartService {
  private apiUrl = 'http://localhost:5038/api';
  readonly PhotosUrl = 'http://localhost:5038/Photos';

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  }

  private cart: Map<number, number> = new Map(); // Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.refreshCart()
    // debugger
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service nếu đang chạy trên trình duyệt
    if (this.isBrowser) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = new Map(JSON.parse(storedCart));
      }
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    // debugger
    console.log('Thêm vào giỏ hàng:', productId, quantity);
    if (this.cart.has(productId)) {
      // debugger
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // debugger
      this.cart.set(productId, quantity);
    }
    // debugger
    this.saveCartToLocalStorage();
    console.log('Giỏ hàng sau khi thêm:', Array.from(this.cart.entries()));
  }


  getCart(): Map<number, number> {
    return this.cart;
  }

  setCart(cart: Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }

  // Lưu trữ giỏ hàng vào localStorage nếu đang chạy trên trình duyệt
  private saveCartToLocalStorage(): void {
    // debugger
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
  }

  // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
  clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartToLocalStorage(); // Lưu giỏ hàng mới vào Local Storage (trống) nếu đang chạy trên trình duyệt
  }

  private getCartKey():string {    
    const userResponseJSON = localStorage.getItem('user'); 
    const userResponse = JSON.parse(userResponseJSON!);  
    debugger
    return `cart:${userResponse?.id ?? ''}`;

  }

  public  refreshCart(){
    const storedCart = localStorage.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));      
    } else {
      this.cart = new Map<number, number>();
    }
  }
}
