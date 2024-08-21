import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('email', email, 'password', password);
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

  private storeTokens(tokens: AuthResponse) {
    if (tokens && tokens.token && tokens.id) {
      localStorage.setItem('access_token', tokens.token);
      localStorage.setItem('user_id', tokens.id.toString());
    } else {
      console.error('Tokens received from API are invalid:', tokens);
    }
  };

}
