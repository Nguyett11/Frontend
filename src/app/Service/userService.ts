import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/users';
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class userService {
  private apiUrl = 'http://localhost:5038/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    }),
    withCredentials: true // Ensures cookies are sent with the request if necessary
  }
  private isAuthenticatedFlag: boolean = false;
  private authenticatedSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject to emit authentication state

  private currentUser: User | null = null;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const apiUrlWithRole = `${this.apiUrl}`; 
    return this.http.get<any>(apiUrlWithRole);
  }
  

  //Register
  register(body: any){
    const url = `${this.apiUrl}`;
    return this.http.post(url, body);
  }

  // Cập nhật mật khẩu
  updatePassword(id: number, body: any): Observable<any> {
    const url = `${this.apiUrl}/${id}/password`;  // Chú ý sửa lại URL
    return this.http.patch<any>(url, body, this.httpOptions);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  // getUserByID(id: number): Observable<any>{
  //   const url = `${this.apiUrl}/Users/${id}`;
  //   return this.http.get<any>(url);
  // }

   // Login function using JSON body
   get authenticated$(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post(`${this.apiUrl}/login`, formData, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res.success) {
            this.setAuthenticated(true);
            localStorage.setItem('userId', res.user.user_id);
            localStorage.setItem('username', res.user.username);

            console.log('UserId:', localStorage.getItem('userId'));
            console.log('Username:', localStorage.getItem('username'));
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, this.httpOptions)
      .pipe(
        tap(() => {
          this.setAuthenticated(false);
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
        })
      );
  }

  setAuthenticated(flag: boolean) {
    this.isAuthenticatedFlag = flag;
    this.authenticatedSubject.next(flag); // Emit the new authentication state
  }

  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('userId');
  // }
  
  getUserId(){
    return localStorage.getItem('userId');
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    // Lưu thông tin người dùng vào localStorage hoặc sessionStorage để duy trì trong phiên làm việc
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    // Kiểm tra trong localStorage xem có người dùng không
    if (this.currentUser) {
      return this.currentUser;
    } else {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
        return this.currentUser;
      }
      return null;
    }
  }
}
