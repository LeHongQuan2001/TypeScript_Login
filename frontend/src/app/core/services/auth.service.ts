import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  data: any;
  access_token: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response) {
            this.storeTokens(response);
          } else {
            console.error('Invalid response structure:', response);
          }
        })
      );
  };

  private storeTokens(res: AuthResponse) {
    if (res && res.data.access_token && res.data.id) {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('user_id', res.data.id.toString());
    } else {
      console.error('Tokens received from API are invalid:', res);
    }
  };

}
