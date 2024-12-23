import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface LastAccessedItem {
  path: string;
  display: string;
}

@Injectable({
  providedIn: 'root'
})
export class LastAccessedService {
  private readonly MAX_ITEMS = 6;
  private lastAccessed: LastAccessedItem[] = [
    { path: '/home', display: 'Home' }
  ];
  private lastAccessedSubject = new BehaviorSubject<LastAccessedItem[]>(this.lastAccessed);

  lastAccessed$ = this.lastAccessedSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/') {
          this.addPath(event.urlAfterRedirects);
        }
      }
    });
  }

  private addPath(path: string): void {
    const formattedPath = this.formatPath(path);
    const index = this.lastAccessed.findIndex(item => item.path === path);
    if (index > -1) {
      this.lastAccessed.splice(index, 1); // Remove the existing item
    }
    this.lastAccessed.unshift({ path, display: formattedPath });
    if (this.lastAccessed.length > this.MAX_ITEMS) {
      this.lastAccessed.pop();
    }
    this.lastAccessedSubject.next(this.lastAccessed);
  }

  private formatPath(path: string): string {
    const pathSegments = path.split('/');
    console.log('Path segments:', pathSegments);
    if (pathSegments[1] === 'touristic-attractions' && pathSegments.length > 3) {
      return 'Touristic attractions results';
    }
    const lastSegment = pathSegments.pop() || '';
    const removedIdSegment = lastSegment.split('_')[0];
    const decodedSegment = decodeURIComponent(removedIdSegment); // Decode URI component

    return decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1);
  }
}
