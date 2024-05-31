import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { LastAccessedService } from '../last-accessed.service';
import { GlobalsService } from '../globals.service';



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

  constructor(private globalsService: GlobalsService, private route: ActivatedRoute, private countryService: CountryService, private lastAccessedService: LastAccessedService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryId = params.get('id');
      if (countryId) {
        this.countryService.getCountryById(countryId).subscribe(data => {
          this.country = data;
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
}
