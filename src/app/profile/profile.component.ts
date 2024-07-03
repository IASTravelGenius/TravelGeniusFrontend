import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { Profile } from '../models/profile.interface';
import { CountriesService } from '../countries.service';
import { Tag } from '../models/tag.interface';
import { Country } from '../models/country';
import { City } from '../models/city';
import { SimpleProfile } from '../models/simple-profile';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  simpleProfile: SimpleProfile = {} as SimpleProfile;
  changesMade = false;
  changes: { [key: string]: boolean } = {
    description: false,
    country: false,
    city: false,
    tags: false
  };

  countryControl = new FormControl();
  cityControl = new FormControl();
  tagControl = new FormControl();

  filteredCountries: Observable<Country[]>;
  filteredCities: Observable<City[]>;
  filteredTags: Observable<Tag[]>;

  allTags: Tag[] = [];
  allCountries: Country[] = [];
  allCities: City[] = [];

  deletedTags: Tag[] = [];
  newTag: string = '';

  constructor(private profileService: ProfileService, private countriesService: CountriesService, private http: HttpClient, private globalsService: GlobalsService) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTags(value))
    );
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
    this.loadCountries();
    //we want to wait for the countries to be loaded before loading the profile
    while (this.allCountries.length === 0) {
    }
    this.loadProfile();

    this.loadTags();

    this.countryControl.valueChanges.subscribe(value => {
      this.cityControl.setValue('');
      this.filteredCities = this.cityControl.valueChanges.pipe(
        startWith(''),
        map(cityValue => this._filterCitiesByCountry(value, cityValue))
      );
    });
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      (data: Profile) => {
        this.profile = data;
        console.log("Profile", this.profile)
        console.log("Profile country name", this.profile?.countryName)
        if (this.profile && this.profile?.countryName) {
          console.log("Profile country name", this.profile?.countryName);
          const country = this.allCountries.find(country => country.name === this.profile?.countryName);
          console.log("Gasesc country", country);
          this.countryControl.setValue(country?.name);
          this.loadCities(country?.id.toString() || '');

        }
      },
      (error: any) => console.error('Error fetching profile', error)
    );
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (data: Country[]) => {
        this.allCountries = data;
        this.filteredCountries = this.countryControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCountries(value))
        );
        this.filteredCities = this.cityControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCities(value))
        );
      },
      (error: any) => console.error('Error fetching countries', error)
    );
  }

  loadCities(countryId: string): void {
    console.log("Incarc orasele pentru tara cu id", countryId);
    const urlBackend = environment.backendUrl + "/cities/country=" + countryId;
    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken(),
    };

    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response', // Correct usage for the observe option
    };

    this.http.get<City[]>(urlBackend, options).pipe(
      map(response => {
        console.log('Cities response:', response);
        return response.body as City[]}),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    ).subscribe(cities => {
      this.allCities = cities;
      if (this.profile?.cityName) {
        const city = this.allCities.find(city => city.name === this.profile?.cityName);

        this.cityControl.setValue(city?.name);
      }
      console.log('Cities:', this.allCities);
    });
  }

  loadTags(): void {
    this.profileService.getTags().subscribe(
      (data: Tag[]) => this.allTags = data,
      (error: any) => console.error('Error fetching tags', error)
    );
  }

  onInputChange(attribute: string): void {
    this.changes[attribute] = true;
    this.changesMade = true;
  }

  onFileSelected(event: any): void {
    // Handle file selection
    // this.changes.profilePhoto = true;
    this.changesMade = true;
  }

  onCountrySelected(event: any): void {
    // Handle country selection
    this.changes['country'] = true;
    console.log("Country selected event.option.value", event.option.value)
    //have to look through all the countries and find the one with the same name as the selected one and get its id
    console.log("All countries", this.allCountries);
    const countryId = this.allCountries.find(country => country.name === event.option.value)?.id;
    this.loadCities(countryId?.toString() || '');
    this.cityControl.setValue(''); // Reset city control
    this.changesMade = true;
  }

  onCitySelected(event: any): void {
    // Handle city selection
    this.changes['city'] = true;
    this.changesMade = true;
  }

  onTagSelected(event: any): void {
    this.newTag = event.option.value;
  }

  addTag(): void {
    const tag = this.allTags.find(t => t.tag === this.newTag);
    if (tag && this.profile && !this.profile.tags.find(t => t.id === tag.id) && this.profile.tags.length < 5) {
      tag.oldPosition = -1;
      this.profile.tags.push(tag);
      console.log('Tags:', this.profile.tags);
      this.newTag = '';
      this.changesMade = true;
      this.changes['tags'] = true;
    }
  }
  
  removeTag(tagId: number): void {
    if (this.profile) {
      const tag = this.profile.tags.find(t => t.id === tagId);
      if (tag) {
        // tag.oldPosition = this.profile.tags.indexOf(tag);
        this.deletedTags.push(tag);
      }
      this.profile.tags = this.profile.tags.filter(tag => tag.id !== tagId);
      console.log('Tags:', this.profile.tags);
      this.changes['tags'] = true;
      this.changesMade = true;
    }
  }

  drop(event: CdkDragDrop<Tag[]>): void {
    if (this.profile) {
      moveItemInArray(this.profile.tags, event.previousIndex, event.currentIndex);
      console.log('Tags:', this.profile.tags);
      this.changesMade = true;
      this.changes['tags'] = true;
    }
  }

  submitChanges(): void {
    const updatedProfile: SimpleProfile = {};

    if (this.changes['description']) {
      updatedProfile.description = this.profile?.description;
    }
    if (this.changes['country']) {
      updatedProfile.countryName = this.countryControl.value;
    }
    if (this.changes['city']) {
      updatedProfile.cityName = this.cityControl.value;
    }
    if (this.changes['tags']) {
      updatedProfile.tags = this.profile?.tags;
      updatedProfile.deletedTags = this.deletedTags;
    }
    console.log('Updating profile:', updatedProfile);
    this.profileService.updateProfile(updatedProfile).subscribe(
      response => {
        console.log('Profile updated successfully');
        this.changesMade = false;
        this.changes = { description: false, country: false, city: false, profilePhoto: false };
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }

  private _filterTags(value: string): Tag[] {
    const filterValue = (value || '').toLowerCase();
    return this.allTags.filter(tag => tag.tag.toLowerCase().includes(filterValue));
  }

  private _filterCountries(value: string): Country[] {
    console.log('Filtering countries:', value);
    const filterValue = (value || '').toLowerCase();
    console.log('All countries:', this.allCountries);
    return this.allCountries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  private _filterCities(value: string): City[] {
    console.log('Filtering cities:', value)
    const filterValue = (value || '').toLowerCase();
    console.log('All cities:', this.allCities);
    return this.allCities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  private _filterCitiesByCountry(countryName: string, cityValue: string): City[] {
    const selectedCountry = this.allCountries.find(country => country.name.toLowerCase() === countryName.toLowerCase());
    if (!selectedCountry) {
      return [];
    }
    const filterValue = (cityValue || '').toLowerCase();
    return this.allCities.filter(city => city.name.toLowerCase().includes(filterValue));
  }
}
