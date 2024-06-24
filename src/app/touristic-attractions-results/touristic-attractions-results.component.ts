import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TouristicAttractionService } from '../touristic-attraction.service';
import { TouristicAttraction } from '../models/touristic-attraction';
import { Deal } from '../models/deal';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';


declare const google: any;

@Component({
  selector: 'app-touristic-attractions-results',
  templateUrl: './touristic-attractions-results.component.html',
  styleUrls: ['./touristic-attractions-results.component.css']
})
export class TouristicAttractionsResultsComponent implements OnInit {
  attractions: TouristicAttraction[] = [];
  deals: Deal[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: any[] = [];
  showMap = false;
  range: number = 10;
  latitude: number = 0;
  longitude: number = 0;

  showSection: boolean = false;

  private markers: any[] = [];


  constructor(private attractionService: TouristicAttractionService, private route: ActivatedRoute, private touristicAttractionService: TouristicAttractionService, private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService, private router: Router) {}

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
    
    this.delaySectionDisplay();


    this.route.params.subscribe(params => {
      this.latitude = +params['latitude'];
      this.longitude = +params['longitude'];
      this.range = +params['range'];
      if (this.latitude && this.longitude && this.range) {
        this.attractionService.getAttractionsByCoordinates(this.latitude, this.longitude, this.range)
          .subscribe(attractions => {
            console.log('attractions:', attractions)
            this.attractions = attractions;
            this.showMap = false;
          }, error => {
            console.error('Error fetching attractions:', error);
          });
      }
    });



    // this.initMap();
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMap(): void {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.router.navigate(['/touristic-attractions']);
    }
  }

  delaySectionDisplay(): void {
    setTimeout(() => {
      this.showSection = true;
    }, 2000); // Adjust the delay time as needed
  }

  // searchAttractions(): void {
  //   if (this.latitude && this.longitude && this.range) {
  //     this.router.navigate(['/touristic-attractions', this.latitude, this.longitude, this.range]);
  //   //   this.attractionService.getAttractionsByCoordinates(this.latitude, this.longitude, this.range)
  //   //     .subscribe(attractions => {
  //   //       this.attractions = attractions;
  //   //       this.showMap = false;
  //   //     }, error => {
  //   //       console.error('Error fetching attractions:', error);
  //   //     });
  //   // }
  //   }
  // }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }

  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }
}
