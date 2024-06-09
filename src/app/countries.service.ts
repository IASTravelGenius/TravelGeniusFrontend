import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from './models/country';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  constructor(private http: HttpClient, private globalsService: GlobalsService) { }

  getCountries(): Observable<Country[]> {
    const urlBackend = environment.backendUrl + "/countries";
    const headers_dict = {
      'Authorization': 'Bearer ' + this.globalsService.getAccessToken(),
    }
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    return this.http.get<Country[]>(urlBackend, options).pipe(
      map(response => {
        console.log('Countries response:', response);
        return response.body as Country[]}),
      catchError(error => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
  }
}
