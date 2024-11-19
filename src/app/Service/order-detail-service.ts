import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = 'http://localhost:5038/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

    getOrderTails():Observable<any> {
        return this.http.get<any>(this.apiUrl+'/Order_Details');
    }

    getOrderDetailById(id: number): Observable<any> {
        const url = `${this.apiUrl}/Order_Details/order_id/${id}`;
        return this.http.get<any>(url, this.httpOptions);
    }
}
