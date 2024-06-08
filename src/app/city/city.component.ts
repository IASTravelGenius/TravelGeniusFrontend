import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
import { City } from '../models/city';
import { Attraction } from '../models/attraction';
import { Deal } from '../models/deal';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: City = new City('Not found', 'Not Found', 'Not found', 'Not found', 0, [], [], [], [], []);
  attractions: Attraction[] = [];
  news: any[] = [];
  reviews: any[] = [];
  deals: Deal[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: any[] = [];

  constructor(private route: ActivatedRoute, private cityService: CityService, private globalsService: GlobalsService, 
    private lastAccessedService: LastAccessedService, private dealsService: DealsService
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
      this.loadCityData(cityId);
    });
  }

  loadCityData(cityId: string): void {
    this.cityService.getCityById(cityId).subscribe(city => {
      this.city = city;
    }, error => {
      console.error('Error loading city data:', error);
    });

    this.cityService.getAttractionsByCityId(cityId).subscribe(attractions => {
      this.attractions = attractions;
    }, error => {
      console.error('Error loading attractions:', error);
    });

    // Load news and reviews for the city
    this.loadNews(cityId);
    this.loadReviews(cityId);
  }

  loadNews(cityId: string): void {
    // Mock data for now
    this.news = [
      { title: 'News Title 1', excerpt: 'This is an excerpt of the news 1.' },
      { title: 'News Title 2', excerpt: 'This is an excerpt of the news 2.' }
    ];
  }

  loadReviews(cityId: string): void {
    // Mock data for now
    this.reviews = [
      { title: 'Great City!', stars: 5, text: 'This city is amazing!', date: new Date(), author: { username: 'JohnDoe', photoUrl: 'author1.jpg' } },
      { title: 'Nice Place', stars: 4, text: 'I enjoyed my visit.', date: new Date(), author: { username: 'JaneDoe', photoUrl: 'author2.jpg' } }
    ];
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
