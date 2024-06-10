import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Profile } from './models/profile.interface';
import { Country } from './models/country';
import { City } from './models/city';
import { Tag } from './models/tag.interface';
import { SimpleProfile } from './models/simple-profile';
import { GlobalsService } from './globals.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  allTags: Tag[] = [];

  constructor(private http: HttpClient, private globalsService: GlobalsService) {}

  getProfile(): Observable<Profile> {
    const urlBackend = environment.backendUrl + "/user/completeProfile";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    };
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    return this.http.get<Profile>(urlBackend, options).pipe(
      map(response => {
        console.log('Profile response:', response);
        return response.body as Profile;
      }),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
  }

  // getCountries(): Observable<Country[]> {
  //   const urlBackend = environment.backendUrl + "/countries";
  //   const headers_dict = {
  //     'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
  //   };
  //   const options = {
  //     headers: new HttpHeaders(headers_dict),
  //     observe: 'response' as 'response'  // Correct usage for the observe option
  //   };

  //   return this.http.get<Country[]>(urlBackend, options).pipe(
  //     map(response => {
  //       console.log('Countries response:', response);
  //       this.allCountries = response.body as Country[];
  //       return this.allCountries;
  //     }),
  //     catchError(error => {
  //       console.error('Backend error:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  // getCities(): Observable<City[]> {
  //   const urlBackend = environment.backendUrl + "/cities";
  //   const headers_dict = {
  //     'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
  //   };
  //   const options = {
  //     headers: new HttpHeaders(headers_dict),
  //     observe: 'response' as 'response'  // Correct usage for the observe option
  //   };

  //   return this.http.get<City[]>(urlBackend, options).pipe(
  //     map(response => {
  //       console.log('Cities response:', response);
  //       this.allCities = response.body as City[];
  //       return this.allCities;
  //     }),
  //     catchError(error => {
  //       console.error('Backend error:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  getTags(): Observable<Tag[]> {
    const urlBackend = environment.backendUrl + "/tags";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    };
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    return this.http.get<Tag[]>(urlBackend, options).pipe(
      map(response => {
        console.log('Tags response:', response);
        this.allTags = response.body as Tag[];
        return this.allTags;
      }),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
  }

  updateProfile(profile: SimpleProfile): Observable<any> {
    const urlBackend = environment.backendUrl + "/user/updateProfile";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    };
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    return this.http.post(urlBackend, profile, options).pipe(
      map(response => {
        console.log('Update profile response:', response);
        return response;
      }),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
  }
}
