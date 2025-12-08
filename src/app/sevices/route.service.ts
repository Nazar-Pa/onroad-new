import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface AuthenticationResponse {
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8088/api/v1'

  addRoute(body: any) {
    return this.http.post<any>(`${this.apiUrl}/routes/new`, body, { withCredentials: true })
  }

  fetchSearchedRoutes(searchParams: any, page?: number, size?: number): Observable<any> {
    const { fromCity, fromTo, routeDate, numberOfPass } = searchParams;
    console.log(typeof routeDate, routeDate.toLocaleDateString())
    return this.http.get<any>(`${this.apiUrl}/routes/search?from=${fromCity}&to=${fromTo}&date=${routeDate.toLocaleDateString()}&numbOfPass=${numberOfPass}`)
  }

  authenticate(requestBody: { email: string, password: string }): Observable<AuthenticationResponse> {
    return this.http.post<any>(`${this.apiUrl}/auth/authenticate`, requestBody)
  }
}
