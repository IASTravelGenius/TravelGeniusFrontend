import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Country } from './models/country';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // private countries = [
  //   { id: 'japan_1', name: 'Italy', description: 'Italy is a beautiful country...', flag: 'assets/Flag_of_Italy.svg' },
  //   { id: 'france', name: 'France', description: 'France is known for its art...', flag: 'assets/Flag_of_France.svg' },
  //   { id: 'germany', name: 'Germany', description: 'Germany has a rich history...', flag: 'assets/Flag_of_Germany.svg' },
    
  //   // Add more countries as needed
  // ];

  constructor(private globalsService: GlobalsService, private http: HttpClient) { }

  getCountryById(id: string): Observable<Country> {
    // country= first part of id capitalised
    const country = id.split('_')[0][0].toUpperCase() + id.split('_')[0].substr(1).toLowerCase();
    const urlBackend = environment.backendUrl + "/countries/country=" + country;
    
    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken(),
    };

    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response', // Correct usage for the observe option
    };

    return this.http.get<Country>(urlBackend, options).pipe(
      map((response) => {
        console.log('Country response:', response);
        return response.body as Country;
      }),
      catchError((error) => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
    // const country = this.countries.find(c => c.id === id);
    // return of(country);
  }
}
