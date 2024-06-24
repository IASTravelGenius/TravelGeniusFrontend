import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
import { City } from '../models/city';
import { Review } from '../models/review';
import { Deal } from '../models/deal';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Photo } from '../models/photo.interface';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: City = new City('Not found', 'Not Found', 'Not found', { id: 0, photoUrl: '', source: '' }, 0, [], [], [], [], [], 'Not found', 0);
  // attractions: Attraction[] = [];
  news: any[] = [];
  // reviews: any[] = [];
  deals: Deal[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: any[] = [];
  countryId = '';

  newReview: Review = { title: '', text: '', rating: 0, username: '', userPhoto: { id: 0, photoUrl: '', source: '' }, publishingDate: '' };


  constructor(private route: ActivatedRoute, private cityService: CityService, private globalsService: GlobalsService, 
    private lastAccessedService: LastAccessedService, private dealsService: DealsService, private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });
    this.dealsService.getDeals().subscribe(deals => {
      this.deals = deals;
    });

    this.route.params.subscribe(params => {
      const cityId = params['cityId'];
      this.countryId = params['countryId'];

      this.loadCityData(cityId);
    });
  }

  loadCityData(cityId: string): void {
    this.cityService.getCityById(cityId).subscribe(city => {
      this.city = city;
      console.log(this.city);
    }, error => {
      console.error('Error loading city data:', error);
    });

    // this.cityService.getAttractionsByCityId(cityId).subscribe(attractions => {
    //   this.attractions = attractions;
    // }, error => {
    //   console.error('Error loading attractions:', error);
    // });

    // Load news and reviews for the city
    this.loadNews(cityId);
    // this.loadReviews(cityId);
  }

  loadNews(cityId: string): void {
    // Mock data for now
    this.news = [
      { title: 'News Title 1', excerpt: 'This is an excerpt of the news 1.' },
      { title: 'News Title 2', excerpt: 'This is an excerpt of the news 2.' }
    ];
  }

  addReview(): void {
    if (this.globalsService.getUsername() !== null) {
      this.newReview.username = this.globalsService.getUsername() ?? '';
    }
    this.newReview.publishingDate = new Date().toISOString();


    console.log(this.newReview);
    if (this.city) {
      const url = `${environment.backendUrl}/addReview/entity_id=${this.city.id}/entity_type=2`;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.globalsService.getAccessToken() });

      this.http.post(url, this.newReview, { headers }).subscribe(
        response => {
          console.log('Review added:', response);
          this.city?.reviews.unshift(this.newReview);  // Add the new review to the top of the reviews list
          this.newReview = { title: '', text: '', rating: 0, username: '', userPhoto: { id: 0, photoUrl: '', source: '' }, publishingDate: '' };
        },
        error => {
          console.error('Error adding review:', error);
        }
      );
    }
  }


  // loadReviews(cityId: string): void {
  //   // Mock data for now
  //   // this.reviews = [
  //   //   { title: 'Great City!', stars: 5, text: 'This city is amazing!', date: new Date(), author: { username: 'JohnDoe', photoUrl: 'author1.jpg' } },
  //   //   { title: 'Nice Place', stars: 4, text: 'I enjoyed my visit.', date: new Date(), author: { username: 'JaneDoe', photoUrl: 'author2.jpg' } }
  //   // ];
  // }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }
  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
