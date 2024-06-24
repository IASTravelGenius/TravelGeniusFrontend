import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deal } from './models/deal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GlobalsService } from './globals.service';


@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private MOCK_DEALS: Deal[] = [
    new Deal('Deal1', 'Deal1', 'Deal 1 is a great deal...', 'assets/deal1.jpg'),
    new Deal('2', 'Deal 2', 'Deal 2 is an amazing deal...', 'assets/deal2.jpg'),
    new Deal('3', 'Deal 3', 'Deal 3 is a fantastic deal...', 'assets/deal3.jpg'),
    // Add more deals as needed
  ];

  constructor(private http : HttpClient, private globalsService: GlobalsService) { }

  getDeals() : Observable<Deal[]> {
    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken(),
    };
    const options = {
      headers: headers_dict,
      observe: 'response' as 'response',
    };

    const url = environment.backendUrl + '/discover';
    return this.http.get<Deal[]>(url, options).pipe(
      map((response) => {
        console.log('Deals response:', response);
        return response.body as Deal[];
      }),
      catchError((error) => {
        console.error('Backend error:', error);
        return throwError(error);
      })
    );
    // return of(this.MOCK_DEALS);
  }
}
