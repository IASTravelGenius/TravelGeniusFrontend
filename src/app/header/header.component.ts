import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;

  constructor(private globalsService: GlobalsService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.globalsService.closeDropdown();
      }
    });

    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });
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

  logout() {
    const requestBody = {
      "accessToken" : this.globalsService.getAccessToken(),
      "refreshToken" : this.globalsService.getRefreshToken()
    };

    const url = environment.authenticationServiceUrl + '/authService/logout';

    this.http.post(url, requestBody).subscribe(() => {
      this.globalsService.clearTokens();
    }, error => {
      console.error('Logout error:', error);
      this.globalsService.clearTokens();
    });
  }
}
