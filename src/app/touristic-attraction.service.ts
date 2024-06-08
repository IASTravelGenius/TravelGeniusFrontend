import { Injectable } from '@angular/core';
import { Attraction } from './models/attraction';
import { Observable, of } from 'rxjs';
import { Review } from './models/review';

export const MOCK_ATTRACTIONS: Attraction[] = [
  new Attraction('eiffel', 'Eiffel Tower', 'An iconic symbol of France.', 'assets/640px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg'),
  new Attraction('louvre', 'Louvre Museum', 'The world\'s largest art museum.', 'assets/colosseum.jpg'),
  new Attraction('basilica', 'Basilica of Notre-Dame de Fourvière', 'A minor basilica in Lyon.', 'assets/basilica.jpg'),
  new Attraction('park', 'Parc de la Tête d\'Or', 'A large urban park in Lyon.', 'assets/park.jpg', ['beautiful', 'romantic'],
    ['assets/park1.jpg', 'assets/park2.jpg', 'assets/park3.jpg'], 
    [
      new Review('A great park', 'I loved the park!', 5, 'I really enjoyed visting the park.', new Date('2021-01-01'), 'John Doe', 'assets/download.jpeg', 'park'),
      new Review('Beautiful park', 'The park is beautiful.', 4, 'I loved the flowers in the park.', new Date('2021-01-02'), 'Jane Doe', 'assets/download.jpeg', 'park'),
      new Review('The park is amazing', 'I had a great time in the park.', 2, 'I loved the animals in the park.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'park')
    ]
  )
];

@Injectable({
  providedIn: 'root'
})
export class TouristicAttractionService {
  

  constructor() { }

  getAttractionById(attractionId: string, countryId: string): Observable<Attraction> {
    const attraction = MOCK_ATTRACTIONS.find(a => a.id === attractionId);
    if (attraction === undefined) {
      return of(new Attraction(attractionId, attractionId[0].toUpperCase() + attractionId.substr(1).toLowerCase(), '', ''));
    }
    return of(attraction);
    // return this.http.get<Attraction>(`/api/attractions/${attractionId}`);
  }

  getAttractionsByCoordinates(latitude: number, longitude: number, range: number): Observable<Attraction[]> {
    return of(MOCK_ATTRACTIONS);
    // return this.http.get<Attraction[]>(`/api/attractions?latitude=${latitude}&longitude=${longitude}&range=${range}`);
  }
}
