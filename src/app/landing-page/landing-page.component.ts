import { Component, OnInit } from '@angular/core';
import { PosthogService } from '../services/posthog.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.css"],
    standalone: false
})
export class LandingPageComponent implements OnInit {
  destinationString: string = ''

  constructor(private posthog: PosthogService, private router: Router) {}

  ngOnInit(): void {
    this.posthog.trackEvent("$pageview");

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const cardsContainer = document.querySelector(".destination-cards");

    if (prevButton != null && nextButton != null && cardsContainer != null) {
      prevButton.addEventListener("click", () => {
        cardsContainer.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      });

      nextButton.addEventListener("click", () => {
        cardsContainer.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      });
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  chooseDestination(): void {
    if (this.destinationString === '') {
      this.router.navigate(['/plan-trip'])
    } else {
      this.router.navigate(["/destination-suggestion"]);
    }
  }
}
