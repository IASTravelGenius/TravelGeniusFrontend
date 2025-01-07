import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalsService } from '../globals.service';
import { PosthogService } from '../services/posthog.service';

@Component({
  selector: "app-suggestion-card",
  templateUrl: "./suggestion-card.component.html",
  styleUrls: ["./suggestion-card.component.css"],
  standalone: false,
})
export class SuggestionCardComponent implements OnInit {
  @Input() destination!: { name: string; image: string; rating: number };

  constructor(private router: Router, private globals: GlobalsService, private posthog: PosthogService) {}

  ngOnInit(): void {}

  onLocationChoosed(): void {
    this.globals.citySelected = this.destination.name

    this.posthog.trackEvent("Card Selected", {
      destination_name: this.destination.name.includes,
      rating: this.destination.rating,
      timestamp: new Date().toISOString(),
    });

    if (this.destination.name.includes('Restaurant')) {
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 1000);
    } else {
      setTimeout(() => {
        this.router.navigate(["/date-time"]);
      }, 1000);
    }
  }
}
