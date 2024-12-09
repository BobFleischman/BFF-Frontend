import { Component } from '@angular/core';
import { House } from '../../types/house';
import { HouseService } from '../../services/house.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
})
export class HouseListComponent {
  houses: House[] = [];
  weather: any[] = [];

  constructor(
    private houseService: HouseService,
    private router: Router,
    public authorizationService: AuthorizationService,
    public weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.houseService.getHouses().subscribe((h) => (this.houses = h));
    this.weatherService.getWeather().subscribe({
      next: (weather) => {
        console.log(weather);
        this.weather = weather;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Done');
      }
    });
  }

  navigateToHouse(id: number) {
    this.router.navigate([`/house/${id}`]);
  }

  addHouse() {
    const newHouse: House = {
      id: 3,
      address: '32 Valley Way, New York',
      description: '',
      country: 'USA',
      price: 1000000,
      photo: '',
    };
    this.houses.push(newHouse);
  }
}
