import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosthogService } from '../services/posthog.service';

@Component({
  selector: "app-food-page",
  templateUrl: "./food-page.component.html",
  styleUrl: "./food-page.component.css",
  standalone: false,
})
export class FoodPageComponent implements OnInit {
  constructor(private router: Router, private posthog: PosthogService) {}

  ngOnInit(): void {
    this.posthog.trackEvent("$pageview");
  }

  onNavigateToResult(): void {
    this.posthog.trackEvent("see_plan_clicked", {
      timestamp: new Date().toISOString(),
    });
    setTimeout(() => {
      this.router.navigate(["/result-page"]);
    }, 1000);
  }
}
