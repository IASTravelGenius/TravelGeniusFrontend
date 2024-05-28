import { Component } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  isMenuOpen = false;
  menuItems = [
    'Home',
    'Countries',
    'News',
    'Flight',
    'Must See'
  ];

  countryItems = [
    'USA',
    'Canada',
    'Mexico',
    'Brazil',
    'Argentina',
    'Chile',
    'Peru',
    'Colombia',
    'Venezuela',
    'Ecuador',
    'Bolivia',
    'Paraguay',
    'Uruguay'
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
