import { Component } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { HomeEntity } from '../models/home-entity';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Destination } from '../models/destination.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMenuOpen = false;
  menuItems = [
    'Home',
    'Countries',
    'News',
    'Flight',
    'Must See'
  ];
  isDropdownOpen = false;
  lastAccessedPaths: { path: string, display: string }[] = [];
  topArticles: HomeEntity[] = [];

  constructor(private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });

    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });

    this.loadArticles();
  }
  
  loadArticles() {
    //we will directly call the backend and load the articles
    const url = environment.backendUrl + '/home';

    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken()
    }

    const options = {
      headers: headers_dict,
      observe: 'response' as 'response'
    }

    this.http.get<HomeEntity[]>(url, options).subscribe(response => {
      console.log('Articles response:', response);
      this.topArticles = response.body as HomeEntity[];
      console.log('Top articles:', this.topArticles);
    }, error => {
      console.error('Error loading articles:', error);
    });
  }

  navigateToDestination(destination: HomeEntity) {
    console.log('Navigating to destination:', destination, destination.type)
    if(destination.type === 'city') {
      this.router.navigate(['/countries', destination.countryName.toLowerCase() + '_' + destination.countryId, destination.name.toLowerCase() + '_' + destination.id]);
      return;
    }
    if (destination.type === 'touristicAttraction') {
      if (destination.countryName)
        this.router.navigate(['/countries', destination.countryName.toLowerCase() + '_' + destination.countryId, 'ta',  destination.name.toLowerCase() + '_' + destination.id]);
      else
        this.router.navigate(['/countries', 'generic', 'ta',  destination.name.toLowerCase() + '_' + destination.id]);
      return;
    } else {
      this.router.navigate(['/countries', destination.name.toLowerCase() + '_' + destination.id]);
    
    }

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
