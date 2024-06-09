import { Component } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { CountriesService } from '../countries.service';
import { Country } from '../models/country';
import { DealsService } from '../deals.service';
import { Deal } from '../models/deal';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  isMenuOpen = false;
  lastAccessedPaths: { path: string, display: string }[] = [];

menuItems = [
    'Home',
    'Countries',
    'News',
    'Flight',
    'Must See'
  ];

  // countries = [
  //   { id: 'italy', name: 'Italy' },
  //   { id: 'france', name: 'France' },
  //   { id: 'germany', name: 'Germany' },
  //   { id: 'spain', name: 'Spain'},
  //   { id: 'usa', name: 'USA' },
  //   { id: 'canada', name: 'Canada' },
  //   { id: 'mexico', name: 'Mexico' },
  //   { id: 'brazil', name: 'Brazil' },
  //   { id: 'argentina', name: 'Argentina' },
  //   { id: 'australia', name: 'Australia' },
  //   { id: 'new-zealand', name: 'New Zealand' },
  //   { id: 'japan', name: 'Japan' },
  //   { id: 'china', name: 'China' },
  //   { id: 'india', name: 'India' },
  //   { id: 'south-africa', name: 'South Africa' },
  //   { id: 'egypt', name: 'Egypt' },
  //   { id: 'morocco', name: 'Morocco' },
  //   { id: 'turkey', name: 'Turkey' },
  //   { id: 'greece', name: 'Greece' },
  //   { id: 'russia', name: 'Russia' },
  //   { id: 'iceland', name: 'Iceland' },
  //   { id: 'norway', name: 'Norway' },
  //   { id: 'sweden', name: 'Sweden' },
  //   { id: 'finland', name: 'Finland' },
  //   { id: 'denmark', name: 'Denmark' },
  //   { id: 'ireland', name: 'Ireland' },
  //   { id: 'scotland', name: 'Scotland' },
  //   { id: 'england', name: 'England' },
  //   { id: 'wales', name: 'Wales' },
  //   { id: 'belgium', name: 'Belgium' },
  //   { id: 'netherlands', name: 'Netherlands' },
  //   { id: 'luxembourg', name: 'Luxembourg' },
  //   { id: 'switzerland', name: 'Switzerland' },
  //   { id: 'austria', name: 'Austria' },
  //   { id: 'poland', name: 'Poland' },
  //   { id: 'czech-republic', name: 'Czech Republic' },
  //   { id: 'slovakia', name: 'Slovakia' },
  //   { id: 'hungary', name: 'Hungary' },
  //   // Add more countries as needed
  // ];
  deals: Deal[] = []
  countries: Country[] = [];

  isDropdownOpen = false;
  constructor(private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService, private countriesService: CountriesService) {}

  ngOnInit() {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });
    this.dealsService.getDeals().subscribe(deals => {
      this.deals = deals;
    });

    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (data: Country[]) => this.countries = data,
      (error: any) => console.error('Error fetching countries', error)
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
