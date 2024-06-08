import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouristicAttractionService } from '../touristic-attraction.service';
import { Attraction } from '../models/attraction';
import { Deal } from '../models/deal';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-touristic-attraction',
  templateUrl: './touristic-attraction.component.html',
  styleUrls: ['./touristic-attraction.component.css']
})
export class TouristicAttractionComponent implements OnInit {
  attraction: Attraction = new Attraction('Not found', 'Not Found', 'Not found', 'Not found', [], [], []);
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
