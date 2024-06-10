import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouristicAttractionService } from '../touristic-attraction.service';
import { Attraction } from '../models/attraction';
import { Deal } from '../models/deal';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';
import { TouristicAttraction } from '../models/touristic-attraction';

@Component({
  selector: 'app-touristic-attraction',
  templateUrl: './touristic-attraction.component.html',
  styleUrls: ['./touristic-attraction.component.css']
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

  constructor(private route: ActivatedRoute, private touristicAttractionService: TouristicAttractionService, private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService) {}

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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
