import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { CityService } from '../city.service';
import { LastAccessedService } from '../last-accessed.service';
import { GlobalsService } from '../globals.service';
import { City } from '../models/city';



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  isMenuOpen = false;

  country: any;
  menuItems = [
    'Home',
    'Countries',
    'News',
    'Flight',
    'Must See'
  ];
  isDropdownOpen = false;
  
  lastAccessedPaths: { path: string, display: string }[] = [];
  cities: City[] = [];

  constructor(private globalsService: GlobalsService, private route: ActivatedRoute, private countryService: CountryService, private lastAccessedService: LastAccessedService, private cityService: CityService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryId = params.get('countryId');
      if (countryId) {
        this.countryService.getCountryById(countryId).subscribe(data => {
          this.country = data;
          this.fetchCities(countryId);
        });
      }
    });

    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });

    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  fetchCities(countryId: string) {
    this.cityService.getCities(countryId).subscribe(cities => {
      this.cities = cities.sort((a, b) => b.population - a.population);
    });
  }
}
