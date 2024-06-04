import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    username: 'JohnDoe',
    description: 'Avid traveler and foodie',
    country: '',
    city: '',
    profilePic: 'assets/download.jpeg',
    tags: ['travel', 'food', 'photography']
  };
  newTag: string = '';
  countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France'];
  cities: { [key: string]: string[] } = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    UK: ['London', 'Manchester', 'Birmingham'],
    Germany: ['Berlin', 'Hamburg', 'Munich'],
    France: ['Paris', 'Lyon', 'Marseille']
  };

  countryControl = new FormControl();
  cityControl = new FormControl();
  filteredCountries: Observable<string[]>;
  filteredCities: Observable<string[]>;
  changesMade: boolean = false;

  isDropdownOpen = false;

  constructor(private http: HttpClient, private globalsService: GlobalsService) {
    this.filteredCountries = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value))
    );
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
  }

  ngOnInit(): void {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
    this.globalsService.closeDropdown();
    // Initialize filteredCities based on the selected country
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
  }


  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities[this.profile.country]?.filter(city => city.toLowerCase().includes(filterValue)) || [];
  }

  onCountrySelected(event: any): void {
    this.profile.country = event.option.value;
    this.cityControl.setValue('');
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
    this.changesMade = true;
  }

  onCitySelected(event: any): void {
    this.profile.city = event.option.value;
    this.changesMade = true;
  }

  removeTag(tag: string): void {
    this.profile.tags = this.profile.tags.filter(t => t !== tag);
    this.changesMade = true;
  }

  addTag(): void {
    if (this.newTag.trim() && !this.profile.tags.includes(this.newTag)) {
      this.profile.tags.push(this.newTag);
      this.newTag = '';
      this.changesMade = true;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.profilePic = e.target.result;
        this.changesMade = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onInputChange(): void {
    this.changesMade = true;
  }

  submitChanges(): void {
    console.log('Profile updated successfully', this.profile);
    this.changesMade = false;
    // const url = `${environment.apiUrl}/profile/update`;
    // this.http.post(url, this.profile).subscribe(response => {
    //   console.log('Profile updated successfully', response);
    //   this.changesMade = false;
    // }, error => {
    //   console.error('Error updating profile', error);
    // });
  }
}
