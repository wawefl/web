import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/admin/admin`);
  }

  create(administrator: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/admin/admin`, administrator);
  }

  update(administrator: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/admin/admin`, administrator);
  }
}
