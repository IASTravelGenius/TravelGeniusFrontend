import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from './models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries = [
    { id: 'japan_1', name: 'Italy', description: 'Italy is a beautiful country...', flag: 'assets/Flag_of_Italy.svg' },
    { id: 'france', name: 'France', description: 'France is known for its art...', flag: 'assets/Flag_of_France.svg' },
    { id: 'germany', name: 'Germany', description: 'Germany has a rich history...', flag: 'assets/Flag_of_Germany.svg' },
    
    // Add more countries as needed
  ];

  constructor() { }

  getCountryById(id: string): Observable<any> {
    const country = this.countries.find(c => c.id === id);
    return of(country);
  }
}
