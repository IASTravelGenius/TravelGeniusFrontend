import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
import { CountryService } from '../country.service';
import { City } from '../models/city';
import { Deal } from '../models/deal';
import { Attraction } from '../models/attraction';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';
import { Country } from '../models/country';



@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css'],
    standalone: false
})
export class CountryComponent implements OnInit {
  country: Country | null = null;
  // cities: City[] = [];
  // attractions: Attraction[] = [];
  // mixedList: any[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths:  { path: string, display: string }[] = [];
  deals: Deal[] = [];

  constructor(private route: ActivatedRoute, private countryService: CountryService, private cityService: CityService, private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService) {}

  ngOnInit(): void {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });
    this.dealsService.getDeals().subscribe(deals => {
      this.deals = deals;
    });

    this.route.params.subscribe(params => {
      const countryId = params['countryId'];
      if (countryId) {
        this.countryService.getCountryById(countryId).subscribe(data => {
          this.country = data;
          this.loadCountryData(countryId);
        });
      }
    });
  }

  loadCountryData(countryId: string): void {
    this.countryService.getCountryById(countryId).subscribe(
      (data: Country) =>{
        console.log("Received country data", data);
        this.country = data;
        console.log("Received country", this.country);

      },
      (error: any) => console.error('Error loading country:', error)
    );
  }

  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }

    // this.cityService.getCities(countryId).subscribe(cities => {
    //   this.cities = cities;
    //   this.createMixedList();
    // }, error => {
    //   console.error('Error loading cities:', error);
    // });

    // this.cityService.getTouristAttractions(countryId).subscribe(attractions => {
    //   this.attractions = attractions;
    //   this.createMixedList();
    // }, error => {
    //   console.error('Error loading attractions:', error);
    // });
  // }

  // createMixedList(): void {
  //   const maxLength = Math.max(this.cities.length, this.attractions.length);
  //   let cityIndex = 0;
  //   let attractionIndex = 0;

  //   this.mixedList = [];

  //   for (let i = 0; i < maxLength; i++) {
  //     if (cityIndex < this.cities.length) {
  //       this.mixedList.push({ type: 'city', data: this.cities[cityIndex] });
  //       cityIndex++;
  //     }
  //     if (attractionIndex < this.attractions.length) {
  //       this.mixedList.push({ type: 'attraction', data: this.attractions[attractionIndex] });
  //       attractionIndex++;
  //     }
  //   }
  // }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
