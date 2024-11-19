import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class categoryService {
    private apiUrl = 'http://localhost:5038/api';
    readonly PhotosUrl = 'http://localhost:5038';

    private httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    }
  
    constructor(private http: HttpClient) {}

    //Lấy danh mục
    getCategory(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/Categories');
    }
  
    //Lấy chi tiết danh mục
    getCategoryDetails(id: number): Observable<any> {
      const url = `${this.apiUrl}/Categories/${id}`;
      return this.http.get<any>(url);
    }
    

}
