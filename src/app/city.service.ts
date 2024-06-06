import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { City } from './models/city';
import { Attraction } from './models/attraction';

export const MOCK_CITIES: City[] = [
  new City(
    'paris',
    'Paris',
    'assets/paris.jpg',
    2148000,
    [
      new Attraction('eiffel', 'Eiffel Tower', 'An iconic symbol of France.', 'assets/640px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg'),
      new Attraction('louvre', 'Louvre Museum', 'The world\'s largest art museum.', 'assets/louvre.jpg')
    ]
  ),
  new City(
    'lyon',
    'Lyon',
    'assets/lyon.jpg',
    513275,
    [
      new Attraction('basilica', 'Basilica of Notre-Dame de Fourvière', 'A minor basilica in Lyon.', 'assets/basilica.jpg'),
      new Attraction('park', 'Parc de la Tête d\'Or', 'A large urban park in Lyon.', 'assets/park.jpg')
    ]
  ),
  new City(
    'rome',
    'Rome',
    'assets/rome.jpeg',
    2873000,
    [
      new Attraction('colosseum', 'Colosseum', 'An ancient amphitheater in Rome.', 'assets/colosseum.jpg'),
      new Attraction('vatican', 'Vatican Museums', 'Christian and art museums located within Vatican City.', 'assets/vatican.jpg')
    ]
  ),
  new City(
    'milan',
    'Milan',
    'assets/milan.jpg',
    1366180,
    [
      new Attraction('duomo', 'Duomo di Milano', 'The Cathedral Church of Milan.', 'assets/duomo.jpg'),
      new Attraction('gallery', 'Galleria Vittorio Emanuele II', 'A shopping gallery in Milan.', 'assets/gallery.jpg')
    ]
  )
];

  export const MOCK_ATTRACTIONS: Attraction[] = [
    new Attraction('eiffel', 'Eiffel Tower', 'An iconic symbol of France.', 'assets/640px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg'),
    new Attraction('louvre', 'Louvre Museum', 'The world\'s largest art museum.', 'assets/louvre.jpg'),
    new Attraction('basilica', 'Basilica of Notre-Dame de Fourvière', 'A minor basilica in Lyon.', 'assets/basilica.jpg'),
    new Attraction('park', 'Parc de la Tête d\'Or', 'A large urban park in Lyon.', 'assets/park.jpg')
  ];

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities(countryId: string): Observable<City[]> {
    return of(MOCK_CITIES.sort((a, b) => b.population - a.population));
    // return this.http.get<City[]>(`/api/countries/${countryId}/cities`);
  }

  getTouristAttractions(countryId: string): Observable<Attraction[]> {
    return of(MOCK_ATTRACTIONS);
    // return this.http.get<Attraction[]>(`/api/countries/${countryId}/attractions`);
  }
}
