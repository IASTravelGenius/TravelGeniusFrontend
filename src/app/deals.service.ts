import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deal } from './models/deal';

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

  constructor() { }

  getDeals() : Observable<Deal[]> {
    return of(this.MOCK_DEALS);
  }
}
