import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalsService } from '../globals.service';
import { Profile } from '../models/profile.interface';
import { Tag } from '../models/tag.interface';
import { Country } from '../models/country';
import { City } from '../models/city';
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
  countries: Country[] = [];
  // countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France'];
  // cities: { [key: string]: string[] } = {
  //   USA: ['New York', 'Los Angeles', 'Chicago'],
  //   Canada: ['Toronto', 'Vancouver', 'Montreal'],
  //   UK: ['London', 'Manchester', 'Birmingham'],
  //   Germany: ['Berlin', 'Hamburg', 'Munich'],
  //   France: ['Paris', 'Lyon', 'Marseille']
  // };
  cities: City[] = [];

  countryControl = new FormControl();
  cityControl = new FormControl();
  filteredCountries: Observable<Country[]>;
  filteredCities: Observable<City[]>;
  changesMade: boolean = false;
  isMenuOpen = false;
  
  tagControl = new FormControl();
  filteredTags: Observable<Tag[]>;

  allTags: Tag[] = [];

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

    this.filteredTags = this.tagControl.valueChanges.pipe(  
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(value => this._filterTags(value))
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
    this.loadAllCountries();
    // this.countryControl.valueChanges.subscribe(value => {
    //   this.cityControl.setValue('');
    //   this.filteredCities = this.cityControl.valueChanges.pipe(
    //     startWith(''),
    //     map(cityValue => this._filterCities(value))
    //   );
    // });
    // if (this.profile?.countryName !== '') {
    //   const countryId = this.countries.find(c => c.name === this.profile?.countryName)?.id;
    //   if (countryId) {
    //     console.log("Caut dupa country id", countryId);
    //     this.loadCities(countryId.toString());
    //   }
  
    // }
    this.loadAllTags();
  }


  private _filterCountries(value: string): Country[] {
    const filterValue = (value || '').toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  private _filterCities(value: string): City[] {
    const filterValue = (value || '').toLowerCase();
    console.log("Cities in filter", this.cities);
    console.log("Filter value in filter", filterValue);
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  // private _filterCountries(value: Country): Country[] {
  //   if (!value) {
  //     return this.countries;
  //   }
  //   if (!value.name) {
  //     return this.countries;
  //   }
  //   const filterValue = value.name.toLowerCase();
  //   return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  // }

  // private _filterCities(value: City): City[] {
  //   if (!this.profile?.countryName) {
  //     return [];
  //   }
  //   if (!value) {
  //     return this.cities;
  //   }
  //   if (!value.name) {
  //     return this.cities;
  //   }
  //   const filterValue = value.name.toLowerCase();
  //   return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  //   // return this.cities[this.profile.countryName]?.filter(city => city.toLowerCase().includes(filterValue)) || [];
  // }

  private _filterTags(value: string | Tag): Tag[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.tag.toLowerCase();
    console.log("All tags in filter", this.allTags);
    return this.allTags.filter(tag => tag.tag.toLowerCase().includes(filterValue));
  }
  

  onCountrySelected(event: any): void {
    if (!this.profile) {
      console.log("Nu am avut profile in country selected")
      return;
    }
    console.log("Country selected", event.option.value);
    this.profile.countryName = event.option.value;
    if (this.profile === null) {
      console.log("Nu am avut profile in country selected")
      return;
    }
    const countryId = this.countries.find(c => c.name === this.profile?.countryName)?.id;
    if (countryId === null || countryId === undefined) {
      console.log("Nu am gasit country id pentru tara selectata");
      return;
    }
    console.log("Country id in country selected", countryId);
    this.loadCities(countryId.toString());
    this.cityControl.setValue('');
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
    this.changesMade = true;
  }

  onCitySelected(event: any): void {
    if (!this.profile) {
      console.log("Nu am avut profile in city selected")
      return;
    }
    console.log("City selected", event.option.value.name);
    this.profile.cityName = event.option.value.name;
    console.log("City selected", this.profile.cityName);
    // this.profile?.cityName = event.option.value;
    this.changesMade = true;
  }

  onTagSelected(event: any): void {
    if (!this.profile) {
      console.log("Nu am avut profile in tag selected")
      return;
    }
    console.log("Tag selected", event.option);
    this.newTag = event.option.value;
    console.log("Tag selected", this.newTag);
  }

  removeTag(tagId: number): void {
    if (!this.profile) {
      return;
    }
    this.profile.tags = this.profile.tags.filter(t => t.id !== tagId);
    this.changesMade = true;
  }

  addTag(): void {
    console.log('Adding tag', this.newTag);
    if (!this.profile) {
      console.log('No profile');
      return;
    }

    if (this.newTag.trim() && !this.profile.tags.find(t => t.tag === this.newTag)) {
      const newTag = this.allTags.find(t => t.tag === this.newTag);
      if (newTag) {
        this.profile.tags.push(newTag);
        this.newTag = '';
        this.changesMade = true;
      }
    }

    // if (this.newTag.trim() && !this.profile.tags.find(t => t.tag === this.newTag)) {
    //   const newTag = this.allTags.find(t => t.tag === this.newTag);
    //   if (newTag) {
    //     this.profile.tags.push(newTag);
    //     this.newTag = '';
    //     this.changesMade = true;
    //   }
    // }
    
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
    const urlBackend = environment.backendUrl + "/user/completeProfile";
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
      console.log('All tags:', this.allTags);
    });
  }

  loadAllCountries(): void {
    const urlBackend = environment.backendUrl + "/countries";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    }

    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    this.http.get<Country[]>(urlBackend, options).pipe(
      map(response => {
        console.log('Countries response:', response);
        return response.body as Country[]}),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    ).subscribe(countries => {
      this.countries = countries;
      console.log('Countries:', this.countries);
    });
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
      this.cities = cities;
      console.log('Cities:', this.cities);
    });
  }

  submitChanges(): void {
    console.log(this.filteredTags);
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
