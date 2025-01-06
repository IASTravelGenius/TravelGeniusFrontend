import { Component, OnInit } from '@angular/core';
import { PosthogService } from '../services/posthog.service';

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.css"],
    standalone: false
})
export class LandingPageComponent implements OnInit {
  constructor(private posthog: PosthogService) {}

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
}
