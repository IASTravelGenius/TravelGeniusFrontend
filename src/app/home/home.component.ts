import { Component } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';


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
  topArticles: any = [];

  constructor(private globalsService: GlobalsService, private lastAccessedService: LastAccessedService) {}

  ngOnInit() {
    this.globalsService.dropdownOpen$.subscribe(isOpen => {
      this.isDropdownOpen = isOpen;
    });

    this.lastAccessedService.lastAccessed$.subscribe(paths => {
      this.lastAccessedPaths = paths;
    });
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
