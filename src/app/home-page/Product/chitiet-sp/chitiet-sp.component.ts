import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../Service/productService';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../Models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chitiet-sp',
  templateUrl: './chitiet-sp.component.html',
  styleUrls: ['./chitiet-sp.component.css']
})
export class ChitietSpComponent implements OnInit{
  public product: Product;  // Khai báo là đối tượng duy nhất
  private routeSub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, private router:Router
  ) {}

  ngOnInit() {
    const Id = Number(this.route.snapshot.paramMap.get('product_id'));
    this.layDetailsSP(Id);
  }


  // Lấy chi tiết sản phẩm theo ID
  layDetailsSP(id: number) {
    this.productService.getProductDetails(id).subscribe({
      next: (data) => {
       this.product = data;
       console.log(id); 
        console.log('Sản phẩm chi tiết:', data); 
        data.PathAnh = this.productService.PhotosUrl + "/" + data.image_url ;
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
      }
    });
  }
  
}
