import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent implements AfterViewInit {
    currentSlideIndex = 0;
  
    ngAfterViewInit() {
      this.showSlide(this.currentSlideIndex);
      this.startAutoSlide();
    }
  
    showSlide(index: number) {
      const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
      if (slides.length === 0) return;
  
      // Ẩn tất cả slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
  
      // Hiển thị slide hiện tại
      this.currentSlideIndex = (index + slides.length) % slides.length;
      slides[this.currentSlideIndex].style.display = 'block';
    }
  
    changeSlide(n: number) {
      this.showSlide(this.currentSlideIndex + n);
    }
  
    startAutoSlide() {
      setInterval(() => {
        this.changeSlide(1);
      }, 3000); // Chuyển slide mỗi 3 giây
    }
}
