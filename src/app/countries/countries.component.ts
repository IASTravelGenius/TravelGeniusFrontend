import { Component } from '@angular/core';
import { GlobalsService } from '../globals.service';

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

  isDropdownOpen = false;
  constructor(private globalsService: GlobalsService) {}

  ngOnInit() {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
