import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  deals = [
    { title: 'Flight to Italy', description: 'Flights are cheap' },
    { title: 'Flight to France', description: 'Flights are cheap' },
    { title: 'Egipt is on sale', description: 'E moca bro!'},
  ];
  isDropdownOpen = false;
  
  lastAccessedPaths: { path: string, display: string }[] = [];
  cities: City[] = [];

  constructor(private globalsService: GlobalsService, private route: ActivatedRoute, private countryService: CountryService, private lastAccessedService: LastAccessedService, private cityService: CityService, private router: Router) { }

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

  navigateToCity(cityId: string) {
    this.router.navigate([`/countries/${this.country.id}/${cityId}`]);
  }
}
