import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserClaim } from '../types/userClaim';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  claims: UserClaim[] = [];

  constructor(private http: HttpClient) {}

  private apiUrl = "\\api2\\";

  httpOptions = {
    headers: new HttpHeaders({
      'X-CSRF': '1',
    }),
  };

  getWeather(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'weather', this.httpOptions).pipe(
      tap((weather) => {
        console.log(weather);
      })
    );
  }

  getWeatherClaims(): Observable<UserClaim[]> {
    return this.http.get<UserClaim[]>(this.apiUrl + 'claims', this.httpOptions).pipe(
      tap((claims) => {
        console.log(claims);
        this.claims = claims;
      })
    );
  }

  getWeatherAlive(): Observable<string> {
    return this.http.get<any>(this.apiUrl + 'alive', this.httpOptions).pipe(
      tap((weather) => {
        console.log(weather);
      })
    );
  }
}
