import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class BrandService {
    private apiUrl = 'http://localhost:5038/api';
    readonly PhotosUrl = 'http://localhost:5038';

    private httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    }
  
    constructor(private http: HttpClient) {}

    //Lấy thương hiệu
    getBrand(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/Brands');
    }
  
    //Lấy chi tiết danh mục
    getBrandDetails(id: number): Observable<any> {
      const url = `${this.apiUrl}/Brands/${id}`;
      return this.http.get<any>(url);
    }

    //lấy thương hiệu theo id danh mục
    getBrand_idDM(id: number): Observable<any> {
      const url = `${this.apiUrl}/Brands/ByCategory/${id}`;
      return this.http.get<any>(url);
    }
    
}
