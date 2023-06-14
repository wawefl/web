import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl: string;

  currentUser: any | undefined = undefined;
  constructor(private http: HttpClient, private router: Router) {
    this.backendUrl = environment.backendUrl;
  }

  login(form: any): any {
    return new Promise((resolve) => {
      this.http
        .post<any>(`${this.backendUrl}/admin/auth/login`, form)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.admin !== undefined) {
              this.currentUser = res.user;
              localStorage.setItem('access_token', res.token);
              resolve(true);
            }
            resolve(false);
          },
          error: (error) => {
            resolve(false);
          },
        });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) =>
      this.http.get<any>(`${this.backendUrl}/admin/auth/user`).subscribe({
        next: async (user: any) => {
          console.log(user);
          this.currentUser = user;
          resolve(!!user);
        },
        error: (error) => {
          resolve(false);
        },
      })
    );
  }

  async logout() {
    this.http
      .post<any>(`${this.backendUrl}/admin/auth/logout`, null)
      .pipe(take(1))
      .subscribe({
        next: async () => {
          console.log(this);
          this.router.navigateByUrl('admin/login');
        },
        error: (error) => console.log(error),
      });
  }
}
