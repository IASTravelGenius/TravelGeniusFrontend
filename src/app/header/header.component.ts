import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;

  constructor(private globalsService: GlobalsService, private router: Router) {}

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
}
