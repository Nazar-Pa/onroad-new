import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8088/api/v1'

  addRoute(body: any) {
    return this.http.post<any>(`${this.apiUrl}/routes/new`, body)
  }

  fetchSearchedRoutes() {}
}