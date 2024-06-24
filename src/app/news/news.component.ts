import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
import { NewsService } from '../news.service';
import { GlobalsService } from '../globals.service';
import { LastAccessedService } from '../last-accessed.service';
import { DealsService } from '../deals.service';
import { News } from '../models/news';
import { Deal } from '../models/deal';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  isMenuOpen = false;
  isDropdownOpen = false;
  lastAccessedPaths: { path: string, display: string }[] = [];
  deals: Deal[] = [];

  constructor(private route: ActivatedRoute, private newsService: NewsService, private cityService: CityService, private globalsService: GlobalsService, private lastAccessedService: LastAccessedService, private dealsService: DealsService) { }

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

    this.loadNews();
  }

  loadNews(): void {
    this.newsService.getNews().subscribe(news => {
      this.news = news;
      console.log('News:', news);
    }, error => {
      console.error('Error loading news:', error);
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  navigateToDeal(deal: Deal) {
    this.globalsService.navigateToDeal(deal);
  }
}
