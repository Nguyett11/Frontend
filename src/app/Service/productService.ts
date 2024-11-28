import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
    providedIn: 'root'
  })

export class ProductService {
    private apiUrl = 'http://localhost:5038/api';
    readonly PhotosUrl = 'http://localhost:5038/Photos';

    private httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    }
  
    constructor(private http: HttpClient) {}

    //Lọc theo danh mục
    public getByIdDM(idDM: number): Observable<any> {
        const url = `${this.apiUrl}/Products/ByCategory/${idDM}`;
        return this.http.get<any>(url);
    }

    //Lọc theo thương hiệu
    public getByIdTH(idTH: number): Observable<any> {
      const url = `${this.apiUrl}/Products/ByBrand/${idTH}`;
      return this.http.get<any>(url);
  }

  // Hàm để gọi API lấy sản phẩm theo category_id và brand_id
  getProductsByCategoryAndBrand(category_id: number, brand_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Products/categories/${category_id}/brands/${brand_id}`);
  }

  //lấy prodcts bằng id product
  getProductDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/Products/${id}`;
    return this.http.get<any>(url);
  }

  // Hàm gọi API để lọc sản phẩm theo giá
  // getProductsByPriceCategory(priceCategory: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/ByPriceCategory/${priceCategory}`);
  // }
  // Hàm gọi API để lọc sản phẩm theo giá
  getProductsByPriceCategory(categoryId: number, priceCategory: string): Observable<any> {
    const url = `${this.apiUrl}/Products/categories/${categoryId}/ByPriceCategory/${priceCategory}`;
    return this.http.get<any>(url);
  }

  //lấy ds sản phẩm
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/Products');
  }

  timkiem(searchText :string): Observable<any>{
    const url = `${this.apiUrl}/Products/search/${searchText}`;
    return this.http.get<any>(url);
  }


  getProductsByIds(productIds: number[]): Observable<Product[]> {
    // Tạo tham số truy vấn với danh sách ID
    const params = new HttpParams().set('ids', productIds.join(','));
  
    // Gửi request GET đến endpoint
    const url = `${this.apiUrl}/Products/by-ids`; // Đảm bảo endpoint đúng với backend
    return this.http.get<Product[]>(url, { params });
  }
  
}
