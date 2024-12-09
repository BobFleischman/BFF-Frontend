import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { House } from '../types/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'X-CSRF': '1',
    }),
  };

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>('/api/houses', this.httpOptions).pipe(
      tap((houses) => {
        console.log(houses);
      })
    );
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`/api/houses/${id}`, this.httpOptions);
  }

  sayHello() : Observable<string> {
    console.log('Saying hello');
    return this.http.get<string>(`/api/hello`, this.httpOptions).pipe(
      tap((hello) => {
        console.log(hello);
      })  
    );
  }

}
