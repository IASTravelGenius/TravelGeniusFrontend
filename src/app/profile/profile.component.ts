import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalsService } from '../globals.service';
import { Profile } from '../models/profile.interface';
import { Tag } from '../models/tag.interface';
import { Photo } from '../models/photo.interface';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // profile = {
  //   username: 'JohnDoe',
  //   description: 'Avid traveler and foodie',
  //   country: '',
  //   city: '',
  //   profilePic: 'assets/download.jpeg',
  //   tags: ['travel', 'food', 'photography']
  // };
  profile: Profile | null = null;

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
  isMenuOpen = false;
  
  allTags: Tag[] = [
    { id: 1, name: 'travel' },
    { id: 2, name: 'food' },
    { id: 3, name: 'photography' },
    { id: 4, name: 'nature' },
    { id: 5, name: 'sports' },
    { id: 6, name: 'music' },
    { id: 7, name: 'art' },
    { id: 8, name: 'fashion' },
    { id: 9, name: 'fitness' },
    { id: 10, name: 'books' }
  ];

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

    // this.globalsService.closeDropdown();
    // Initialize filteredCities based on the selected country
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );

    this.loadProfile();
    this.loadAllTags();
  }


  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (!this.profile?.countryName) {
      return [];
    }
    return this.cities[this.profile.countryName]?.filter(city => city.toLowerCase().includes(filterValue)) || [];
  }

  onCountrySelected(event: any): void {
    if (!this.profile) {
      return;
    }
    this.profile.countryName = event.option.value;
    this.cityControl.setValue('');
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
    this.changesMade = true;
  }

  onCitySelected(event: any): void {
    if (!this.profile) {
      return;
    }
    this.profile.cityName = event.option.value;
    // this.profile?.cityName = event.option.value;
    this.changesMade = true;
  }

  removeTag(tagId: number): void {
    if (!this.profile) {
      return;
    }
    this.profile.tags = this.profile.tags.filter(t => t.id !== tagId);
    this.changesMade = true;
  }

  addTag(): void {
    if (!this.profile) {
      return;
    }

    if (this.newTag.trim() && !this.profile.tags.find(t => t.name === this.newTag)) {
      const newTag = this.allTags.find(t => t.name === this.newTag);
      if (newTag) {
        this.profile.tags.push(newTag);
        this.newTag = '';
        this.changesMade = true;
      }
    }
    
    // if (this.newTag.trim() && !this.profile.tags.includes(this.newTag)) {
    //   this.profile.tags.push(this.newTag);
    //   this.newTag = '';
    //   this.changesMade = true;
    // }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (!this.profile) {
          return;
        }
        this.profile.profilePhoto.photoUrl = e.target.result;
        this.changesMade = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onInputChange(): void {
    this.changesMade = true;
  }

  loadProfile(): void {
    const urlBackend = environment.backendUrl + "/completeProfile";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    }
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    this.http.get<Profile>(urlBackend, options).pipe(
      map(response => {
        console.log('Profile response:', response);
        return response.body as Profile}),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    ).subscribe(profile => {
      this.profile = profile;
    }
    );
  }

  loadAllTags(): void {
    const urlBackend = environment.backendUrl + "/tags";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    }

    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    this.http.get<Tag[]>(urlBackend, options).pipe(
      map(response => {
        console.log('Tags response:', response);
        return response.body as Tag[]}),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    ).subscribe(tags => {
      this.allTags = tags;
    });
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
