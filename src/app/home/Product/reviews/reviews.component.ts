import { Component } from '@angular/core';
import { Reviews } from '../../../Models/reviews';
import { ReviewService } from '../../../Service/review-service';
import { userService } from '../../../Service/userService';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Service/productService';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  userId: number | null = null;
  productId: number;
  reviews: Reviews;
  // newReview: Reviews = {
  //   id: 0,
  //   product_id: 0,
  //   user_id: 0, 
  //   content: '',
  //   rating: 5,
  //   create_at: new Date(),
  // };
 // Id: number;
  constructor(private reviewService: ReviewService,
    private userService: userService, 
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    // this.Id = Number(this.route.snapshot.paramMap.get('product_id'));
   // this.loadReviews();
    this.checkUserLogin();
  }

    // Kiểm tra người dùng đã đăng nhập chưa
  checkUserLogin(): void {
    this.userId = this.userService.getUserId() ? +this.userService.getUserId() : null;
  }

  // Lấy danh sách đánh giá của sản phẩm
  // loadReviews(): void {
  //   this.reviewService.getReviewsByProduct(this.Id).subscribe(reviews => {
  //     console.log(this.Id);
  //     this.reviews = reviews;
  //   });
  // }

  // Gửi đánh giá
  // submitReview(): void {
  //   if (!this.userId) {
  //     alert('Bạn cần đăng nhập để đánh giá sản phẩm!');
  //     return;
  //   }

  //   if (!this.newReview.content || this.newReview.rating <= 0) {
  //     alert('Vui lòng nhập nội dung và xếp hạng sản phẩm.');
  //     return;
  //   }
  //   this.newReview.product_id = this.productId;
  //   this.newReview.user_id = this.userId;
  //   this.newReview.create_at = new Date();

  //   this.reviewService.addReview(this.newReview).subscribe((review) => {
  //     this.reviews.push(review); // Thêm đánh giá mới vào danh sách
  //     this.newReview.content = ''; // Làm sạch form
  //     this.newReview.rating = 0;
  //   });
  // }

  // Add a new review
  // submitReview(): void {
  //   console.log('fsdf',this.newReview);
  //   this.reviewService.addReview(this.newReview).subscribe(
  //     (response) => {
  //       alert('Review added successfully!');
  //       console.log('fsdf',this.newReview);
  //       this.newReview.user_id = this.review.user_id;
  //       this.loadReviewsByUser(this.newReview.user_id);  
  //     },
  //     (error) => {
  //       console.error('Error adding review', error);
  //     }
  //   );
  // }

  // deleteReview(reviewId: number): void {
  //   this.reviewService.deleteReview(reviewId).subscribe(
  //     () => {
  //       alert('Review deleted successfully');
  //       this.loadReviewsByUser(this.newReview.user_id);  
  //     },
  //     (error) => {
  //       console.error('Error deleting review', error);
  //     }
  //   );
  // }
}
