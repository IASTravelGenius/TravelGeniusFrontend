import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TouristicAttractionService } from '../touristic-attraction.service';
import { Attraction } from '../models/attraction';
import { Deal } from '../models/deal';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';


declare const google: any;

@Component({
  selector: 'app-touristic-attractions-all',
  templateUrl: './touristic-attractions-all.component.html',
  styleUrls: ['./touristic-attractions-all.component.css']
})
export class TouristicAttractionsAllComponent implements OnInit, AfterViewInit {
  attractions: Attraction[] = [];
  deals: Deal[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: any[] = [];
  showMap = true;
  range: number = 10;
  latitude: number = 0;
  longitude: number = 0;

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
    



    // this.initMap();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMap(): void {
    this.showMap = !this.showMap;
    if (!this.showMap) {
      this.router.navigate(['/touristic-attractions']);
    }
  }

  initMap(): void {
    console.log(this.globalsService.latitude, this.globalsService.longitude);
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.globalsService.latitude, lng: this.globalsService.longitude },
      zoom: 8
    });

    google.maps.event.addListener(map, 'click', (event: any) => {
      this.clearMarkers();
      const marker = new google.maps.Marker({
        position: event.latLng,
        map: map
    });
    this.markers.push(marker);

      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.globalsService.latitude = this.latitude;
      this.globalsService.longitude = this.longitude;
      console.log('Latitude: ' + this.latitude + ', Longitude: ' + this.longitude);
    });
  }

  clearMarkers(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }
  searchAttractions(): void {
    if (this.latitude && this.longitude && this.range) {
      this.router.navigate(['/touristic-attractions', this.latitude, this.longitude, this.range]);
    //   this.attractionService.getAttractionsByCoordinates(this.latitude, this.longitude, this.range)
    //     .subscribe(attractions => {
    //       this.attractions = attractions;
    //       this.showMap = false;
    //     }, error => {
    //       console.error('Error fetching attractions:', error);
    //     });
    // }
    }
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
