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

  countries = [
    { id: 'italy', name: 'Italy' },
    { id: 'france', name: 'France' },
    { id: 'germany', name: 'Germany' },
    { id: 'spain', name: 'Spain'},
    { id: 'usa', name: 'USA' },
    { id: 'canada', name: 'Canada' },
    { id: 'mexico', name: 'Mexico' },
    { id: 'brazil', name: 'Brazil' },
    { id: 'argentina', name: 'Argentina' },
    { id: 'australia', name: 'Australia' },
    { id: 'new-zealand', name: 'New Zealand' },
    { id: 'japan', name: 'Japan' },
    { id: 'china', name: 'China' },
    { id: 'india', name: 'India' },
    { id: 'south-africa', name: 'South Africa' },
    { id: 'egypt', name: 'Egypt' },
    { id: 'morocco', name: 'Morocco' },
    { id: 'turkey', name: 'Turkey' },
    { id: 'greece', name: 'Greece' },
    { id: 'russia', name: 'Russia' },
    { id: 'iceland', name: 'Iceland' },
    { id: 'norway', name: 'Norway' },
    { id: 'sweden', name: 'Sweden' },
    { id: 'finland', name: 'Finland' },
    { id: 'denmark', name: 'Denmark' },
    { id: 'ireland', name: 'Ireland' },
    { id: 'scotland', name: 'Scotland' },
    { id: 'england', name: 'England' },
    { id: 'wales', name: 'Wales' },
    { id: 'belgium', name: 'Belgium' },
    { id: 'netherlands', name: 'Netherlands' },
    { id: 'luxembourg', name: 'Luxembourg' },
    { id: 'switzerland', name: 'Switzerland' },
    { id: 'austria', name: 'Austria' },
    { id: 'poland', name: 'Poland' },
    { id: 'czech-republic', name: 'Czech Republic' },
    { id: 'slovakia', name: 'Slovakia' },
    { id: 'hungary', name: 'Hungary' },
    // Add more countries as needed
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
