import { Component, OnInit } from '@angular/core';
import { PosthogService } from "./services/posthog.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "TravelGenius";

  constructor(private router: Router, private posthogService: PosthogService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.posthogService.trackEvent("Page Viewed", {
          path: event.urlAfterRedirects,
        });
      }
    });
  }
}
