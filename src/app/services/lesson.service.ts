import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/admin/lesson`);
  }

  create(lesson: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/admin/lesson`, lesson);
  }

  update(lesson: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/admin/lesson`, lesson);
  }
}
