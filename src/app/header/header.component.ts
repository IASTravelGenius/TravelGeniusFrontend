import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  searchResults: any[] = [];

  constructor(private globalsService: GlobalsService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.globalsService.closeDropdown();
      }
    });

    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
  }

  onSearch(event: any) {
    const query = event.target.value;
    const url = environment.backendUrl + '/search?query=' + query;
    const headers_dict = {
      Authorization: 'Bearer ' + this.globalsService.getAccessToken()
    };

    const headers = new HttpHeaders(headers_dict);

    const options = { headers: headers };

    if (query.length >= 1) { // Minimum characters before sending a request
    
      this.http.get(url, options).subscribe((response: any) => {
        this.searchResults = response;
      }, error => {
        console.error('Search error:', error);
        this.searchResults = [];
      });
    } else {
      this.searchResults = [];
    }
  }

  onSelectResult(result: any) {
    // Use entity_id and entity_type for navigation
    this.router.navigate([`/${result.entity_type}`, result.entity_id]);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.globalsService.setDropdownOpen(this.isDropdownOpen);
  }

  closeDropdown() {
    this.globalsService.closeDropdown();
  }

  isLoggedIn(): boolean {
    return this.globalsService.areTokensSet();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    const requestBody = {
      "accessToken" : this.globalsService.getAccessToken(),
      "refreshToken" : this.globalsService.getRefreshToken()
    };

    const url = environment.authenticationServiceUrl + '/authService/logout';

    this.http.post(url, requestBody).subscribe(() => {
      this.globalsService.clearTokens();
      this.globalsService.closeDropdown();
    }, error => {
      console.error('Logout error:', error);
      this.globalsService.clearTokens();
      this.globalsService.closeDropdown();
    });
  }
}
