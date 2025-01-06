import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouristicAttractionService } from '../touristic-attraction.service';
import { Deal } from '../models/deal';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';
import { TouristicAttraction } from '../models/touristic-attraction';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-touristic-attraction',
    templateUrl: './touristic-attraction.component.html',
    styleUrls: ['./touristic-attraction.component.css'],
    standalone: false
})
export class TouristicAttractionComponent implements OnInit {
  attraction: TouristicAttraction = {
    name: 'Not found',
    id: 0,
    description: 'Not found',
    tags: [],
    matchingFactor: 0,
    latitude: 0,
    longitude: 0,
    countryName: 'Not found',
    mainPhotoUrl: {
      id: 0,
      photoUrl: '',
      source: ''
    },
    photos: [],
    reviews: [],
    type: 'Not found',
    cityName: 'Not found',
    cityId: 0,
    countryId: 0
  
  };
  
  deals: Deal[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: any[] = [];
  newReview: Review = { title: '', text: '', rating: 0, username: '', userPhoto: { id: 0, photoUrl: '', source: '' }, publishingDate: '' };


  constructor(private route: ActivatedRoute, private touristicAttractionService: TouristicAttractionService, private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService, private http: HttpClient) {}

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
      const attractionId = params['touristicAttractionId'];
      const countryId = params['countryId'];
      this.loadAttractionData(attractionId, countryId);
    });
  }

  loadAttractionData(attractionId: string, countryId: string): void {
    this.touristicAttractionService.getAttractionById(attractionId, countryId).subscribe(attraction => {
      this.attraction = attraction;
    }, error => {
      console.error('Error loading attraction data:', error);
    });

    // Load reviews for the attraction
    // this.loadReviews(attractionId);
  }

  // loadReviews(attractionId: string): void {
  //   // Mock data for now
  //   this.attraction.reviews = [
      
  //   ];
  // }
  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addReview(): void {
    if (this.globalsService.getUsername() !== null) {
      this.newReview.username = this.globalsService.getUsername() ?? '';
    }
    this.newReview.publishingDate = new Date().toISOString();
    console.log(this.newReview);
    if (this.attraction) {
      const url = `${environment.backendUrl}/addReview/entity_id=${this.attraction.id}/entity_type=3`;
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.globalsService.getAccessToken() });

      this.http.post(url, this.newReview, { headers }).subscribe(
        response => {
          console.log('Review added:', response);
          this.attraction?.reviews.unshift(this.newReview);  // Add the new review to the top of the reviews list
          this.newReview = { title: '', text: '', rating: 0, username: '', userPhoto: { id: 0, photoUrl: '', source: '' }, publishingDate: '' };
        },
        error => {
          console.error('Error adding review:', error);
        }
      );
    }
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
