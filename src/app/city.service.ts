import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { City } from './models/city';
import { Attraction } from './models/attraction';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { throwError } from 'rxjs';
import { News } from './models/news';
import { environment } from 'src/environments/environment';
import { TouristicAttraction } from './models/touristic-attraction';

// export const MOCK_CITIES: City[] = [
//   new City(
//     'paris',
//     'Paris',
//     'The capital of France.',
//     'assets/paris.jpg',
//     2148000,


//     [
//       'assets/paris1.jpg',
//       'assets/paris2.jpg',
//       'assets/paris3.jpg'
//     ],
//     [],
//     // ['romantic', 'historic'],
//     [],
//     // [
//     //   new Attraction('eiffel', 'Eiffel Tower', 'An iconic symbol of France.', 'assets/640px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg'),
//     //   new Attraction('louvre', 'Louvre Museum', 'The world\'s largest art museum.', 'assets/colosseum.jpg')
//     // ],
//     [
//       new News('News Title 1', 'This is an excerpt of the news 1.', 'Source 1', ['tag1', 'tag2']),
//       new News('News Title 2', 'This is an excerpt of the news 2.', 'Source 2', ['tag3', 'tag4']),
//       new News('News Title 3', 'This is an excerpt of the news 3.', 'Source 3', ['tag5', 'tag6'])
//     ],
//     [
//       // new Review('A great city', 'I loved Paris!', 5, 'I really enjoyed visting Paris.', new Date('2021-01-01'), 'John Doe', 'assets/download.jpeg', 'paris'),
//       // new Review('Beautiful city', 'Paris is a beautiful city.', 4, 'I loved the architecture in Paris.', new Date('2021-01-02'), 'Jane Doe', 'assets/download.jpeg', 'paris'),
//       // new Review('Paris is amazing', 'I had a great time in Paris.', 5, 'I loved the food in Paris.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'paris')
//     ]

  
//   ),
//   new City(
//     'lyon',
//     'Lyon',
//     'The third-largest city in France.',
//     'assets/lyon.jpg',
//     515695,
//     [
//       'assets/lyon1.jpg',
//       'assets/lyon2.jpg',
//       'assets/lyon3.jpg'
//     ],
//     [],
//     // ['gastronomy', 'history'],
//     [
//       // new Attraction('basilica', 'Basilica of Notre-Dame de Fourvière', 'A minor basilica in Lyon.', 'assets/basilica.jpg'),
//       // new Attraction('park', 'Parc de la Tête d\'Or', 'A large urban park in Lyon.', 'assets/park.jpg')
//     ],
//     [
//       new News('News Title 1', 'This is an excerpt of the news 1.', 'Source 1', ['tag1', 'tag2']),
//       new News('News Title 2', 'This is an excerpt of the news 2.', 'Source 2', ['tag3', 'tag4']),
//     ],
//     [
//       // new Review('Great city', 'I loved Lyon!', 5, 'I really enjoyed visting Lyon.', new Date('2021-01-01'), 'John Doe', 'assets/download.jpeg', 'lyon'),
//       // new Review('Beautiful city', 'Lyon is a beautiful city.', 4, 'I loved the architecture in Lyon.', new Date('2021-01-02'), 'Jane Doe', 'assets/download.jpeg', 'lyon'),
//       // new Review('Lyon is amazing', 'I had a great time in Lyon.', 5, 'I loved the food in Lyon.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'lyon')
//     ]
//   ),

//   new City(
//     'rome',
//     'Rome',
//     'The capital of Italy.',
//     'https://content.r9cdn.net/rimg/dimg/7f/2e/d82165ea-city-25465-16e7e859ccc.jpg?width=1366&height=768&xhint=1183&yhint=1022&crop=true',
//     2873000,
//     [
//       'assets/rome1.jpg',
//       'assets/rome2.jpg',
//       'assets/rome3.jpg'
//     ],
//     [],
//     // ['historic', 'artistic', 'religious', 'romantic', 'culinary'],
  
//     [
//       // new Attraction('colosseum', 'Colosseum', 'An ancient amphitheater in Rome.', 'assets/colosseum.jpg'),
//       // new Attraction('vatican', 'Vatican Museums', 'Christian and art museums located within Vatican City.', 'assets/vatican.jpg')
//     ],
//     [
//       new News('News Title 1', 'This is an excerpt of the news 1.', 'Source 1', ['tag1', 'tag2']),
//       new News('News Title 2', 'This is an excerpt of the news 2.', 'Source 2', ['tag3', 'tag4'])
//     ],
//     [
//       // new Review('Great city', 'I loved Rome!', 5, 'I really enjoyed visting Rome.', new Date('2021-01-01'), 'John Doe', 'assets/download.jpeg', 'rome'),
//       // new Review('Beautiful city', 'Rome is a beautiful city.', 4, 'I loved the architecture in Rome.', new Date('2021-01-02'), 'Jane Doe', 'assets/download.jpeg', 'rome'),
//       // new Review('Rome is amazing', 'I had a great time in Rome.', 5, 'I loved the food in Rome.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'rome'),
//       // new Review('Rome is amazing', 'I had a great time in Rome.', 5, 'I loved the food in Rome.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'rome'),
//       // new Review('Rome is amazing', 'I had a great time in Rome.', 5, 'I loved the food in Rome.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'rome')
//     ]
//   ),
//   new City(
//     'milan',
//     'Milan',
//     'The second-largest city in Italy.',
//     'assets/milan.jpg',
//     1366180,
//     [
//       'assets/milan1.jpg',
//       'assets/milan2.jpg',
//       'assets/milan3.jpg'
//     ],
//     [],
//     // ['fashion', 'design', 'art', 'finance'],
//     [
//       // new Attraction('duomo', 'Duomo di Milano', 'The Cathedral Church of Milan.', 'assets/duomo.jpg'),
//       // new Attraction('gallery', 'Galleria Vittorio Emanuele II', 'A shopping gallery in Milan.', 'assets/gallery.jpg')
//     ],
//     [
//       new News('News Title 1', 'This is an excerpt of the news 1.', 'Source 1', ['tag1', 'tag2']),
//       new News('News Title 2', 'This is an excerpt of the news 2.', 'Source 2', ['tag3', 'tag4']),
//     ],
//     [
//       // new Review('Great city', 'I loved Milan!', 5, 'I really enjoyed visting Milan.', new Date('2021-01-01'), 'John Doe', 'assets/download.jpeg', 'milan'),
//       // new Review('Beautiful city', 'Milan is a beautiful city.', 4, 'I loved the architecture in Milan.', new Date('2021-01-02'), 'Jane Doe', 'assets/download.jpeg', 'milan'),
//       // new Review('Milan is amazing', 'I had a great time in Milan.', 5, 'I loved the food in Milan.', new Date('2021-01-03'), 'Alice', 'assets/download.jpeg', 'milan')
//     ]
//   )
// ];

  export const MOCK_ATTRACTIONS: Attraction[] = [
    new Attraction('eiffel', 'Eiffel Tower', 'An iconic symbol of France.', 'assets/640px-Tour_Eiffel_Wikimedia_Commons_(cropped).jpg'),
    new Attraction('louvre', 'Louvre Museum', 'The world\'s largest art museum.', 'assets/colosseum.jpg'),
    new Attraction('basilica', 'Basilica of Notre-Dame de Fourvière', 'A minor basilica in Lyon.', 'assets/basilica.jpg'),
    new Attraction('park', 'Parc de la Tête d\'Or', 'A large urban park in Lyon.', 'assets/park.jpg')
  ];

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient, private globalsService: GlobalsService) { }

  // getCities(countryId: string): Observable<City[]> {
  //   return of(MOCK_CITIES.sort((a, b) => b.population - a.population));
  //   // return this.http.get<City[]>(`/api/countries/${countryId}/cities`);
  // }

  getTouristAttractions(countryId: string): Observable<Attraction[]> {
    return of(MOCK_ATTRACTIONS);
    // return this.http.get<Attraction[]>(`/api/countries/${countryId}/attractions`);
  }

  getCityById(cityParameter: string): Observable<City> {
    // console.log(cityId);
    // var city = MOCK_CITIES.find(c => c.id === cityId);
    // if (city === undefined) {
    //   city =  new City(cityId, cityId[0].toUpperCase() + cityId.substr(1).toLowerCase(), '', '', 0, [], [], [], [], []);
    // }
    // return of(city)
    const cityId = cityParameter.split('_')[1];
    const urlBackend = environment.backendUrl + "/cities/city=" + cityId;

    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken(),
    };

    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: 'response' as 'response', // Correct usage for the observe option
    };

    return this.http.get<City>(urlBackend, options).pipe(
      map((response) => {
        console.log('City response:', response);
        return response.body as City;
      }),
      catchError((error) => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );

    // return this.http.get<City>(`/api/cities/${cityId}`);
  }

  // getAttractionsByCityId(cityId: string): Observable<TouristicAttraction[]> {
  //   return 
  //   // const city = MOCK_CITIES.find(c => c.id === cityId);
  //   // return of(city ? city.attractions : []);
  //   // return this.http.get<Attraction[]>(`/api/cities/${cityId}/attractions`);
  // }


}
