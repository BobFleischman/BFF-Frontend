import { Injectable } from '@angular/core';
import { UserClaim } from '../types/userClaim';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private roleClaim: string = '';
  nameClaim: string = '';
  private countryClaim: string = '';
  authenticated: boolean = false;
  logoutUrl: string = '';
  userClaims$: Observable<UserClaim[]> = new Observable<UserClaim[]>();
  rolesClaim: string = '';

  constructor(private http: HttpClient) { }

  convertObjectToUserClaimsArray(obj: any): UserClaim[] {
    return Object.keys(obj).map(key => ({
      type: key,
      value: obj[key]
    }));
  }

  getUserClaims() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-CSRF': '1',
      }),
    };
    this.userClaims$ = this.http.get<UserClaim[]>(
      '/userinfo?slide=false',
      httpOptions
    ).pipe(
      tap((c) => {
        let c1 = this.convertObjectToUserClaimsArray(c);
        //console.log(c1);
      }),
      map((c) => this.convertObjectToUserClaimsArray(c))
    );
    this.userClaims$.subscribe((c) => {      
      let name = c.find((claim) => claim.type === 'name');
      this.nameClaim = name ? name.value : '';

      // let role = c.find((claim) => claim.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role');
      // this.roleClaim = role ? role.value : '';
      let role = c.find((claim) => claim.type === 'applicationrole');
      this.roleClaim = role ? role.value : '';

      // roles come from MY entra Id -- Only First one
      let roles = c.find((claim) => claim.type === 'roles');
      this.rolesClaim = roles ? roles.value : '';


      let country = c.find((claim) => claim.type === 'ctry');
      this.countryClaim = country ? country.value : '';

      let logoutClaim = c.find((claim) => claim.type === 'bff:logout_url');
      this.logoutUrl = logoutClaim ? logoutClaim.value : '';

      this.authenticated = c.length > 0;
    });
  }

  canSeeHouseDetails() {
    console.log(this.roleClaim);
    return this.roleClaim === 'Admin' || this.countryClaim === 'US';
  }

  canAddHouse() {
    return this.roleClaim === 'Contributor'
      || this.roleClaim === 'Admin'
      || this.roleClaim === 'editor';
  }
}
