import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5038/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

    getOrders(): Observable<any> {
        return this.http.get<any>(this.apiUrl+'/Orders');
    }

    deleteOrder(orderId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/Orders/deleteorders/${orderId}`);
    }

    getOrderById(id: number): Observable<any> {
        const url = `${this.apiUrl}/Orders/${id}`;
        return this.http.get<any>(url, this.httpOptions);
    }
}
