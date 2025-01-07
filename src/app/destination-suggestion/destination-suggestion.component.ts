import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: "app-destination-suggestion",
  templateUrl: "./destination-suggestion.component.html",
  styleUrls: ["./destination-suggestion.component.css"],
  standalone: false,
})
export class DestinationSuggestionComponent implements OnInit {
  public destinations: { name: string; image: string; rating: number }[];

  constructor() {
    this.destinations = [
      {
        name: "Paris",
        image: "https://via.placeholder.com/300x200",
        rating: 5,
      },
      {
        name: "Swiss",
        image: "https://via.placeholder.com/300x200",
        rating: 4,
      },
      {
        name: "Thailand",
        image: "https://via.placeholder.com/300x200",
        rating: 4,
      },
      {
        name: "Paris",
        image: "https://via.placeholder.com/300x200",
        rating: 5,
      },
      {
        name: "Swiss",
        image: "https://via.placeholder.com/300x200",
        rating: 4,
      },
    ];
  }

  ngOnInit(): void {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const cardsContainer = document.querySelector(".destination-container");

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
