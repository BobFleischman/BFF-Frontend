import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizationService } from '../../services/authorization.service';
import { HouseService } from '../../services/house.service';
import { WeatherService } from '../../services/weather.service';
import { UserClaim } from '../../types/userClaim';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css',
})
export class AuthenticatorComponent implements OnInit {
  constructor(public authorizationService: AuthorizationService,
    private houseService: HouseService,
    private weatherService: WeatherService
  ) { }

  public claims: UserClaim[] = [];
  ngOnInit(): void {
    this.authorizationService.getUserClaims();
  }

  sayHello() {
    console.log('About to say hello');
    this.houseService.sayHello().subscribe(
      {
        next: (h) => console.log(h),
        error: (e) => console.log(e),
        complete: () => console.log('Complete'),
      }
    );
  };

  getWeather() {
    this.weatherService.getWeather().subscribe(
      {
        next: (w) => console.log(w),
        error: (e) => console.log(e),
        complete: () => console.log('Complete'),
      }
    );
  }

  getWeatherClaims() {
    this.weatherService.getWeatherClaims().subscribe(
      {
        next: (claims) => {
          this.claims = claims;
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete'),
      }
    );
  }

  getWeatherAlive() {
    this.weatherService.getWeatherAlive().subscribe(
      {
        next: (w) => {
          console.log(w);
          window.alert(w);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete'),
      }
    );
  }

}
