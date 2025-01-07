import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: "app-result-page",
  templateUrl: "./result-page.component.html",
  styleUrl: "./result-page.component.css",
  standalone: false,
})
export class ResultPageComponent implements OnInit {
  public destinations: { name: string; image: string; rating: number }[];
  title: string = "Paris - 20-25 December 2024";

  constructor(private router: Router, private globals: GlobalsService) {
    this.destinations = [
      {
        name: "Restaurant 1",
        image: "https://via.placeholder.com/300x200",
        rating: 5,
      },
      {
        name: "Restaurant 2",
        image: "https://via.placeholder.com/300x200",
        rating: 4,
      },
      {
        name: "Restaurant 3",
        image: "https://via.placeholder.com/300x200",
        rating: 4,
      },
      {
        name: "Restaurant 4",
        image: "https://via.placeholder.com/300x200",
        rating: 3,
      },
      {
        name: "Restaurant 5",
        image: "https://via.placeholder.com/300x200",
        rating: 1,
      },
    ];
  }

  ngOnInit(): void {
    const citytSelected = this.globals.citySelected
    const startDateSelected =
      this.globals.dateSelected?.startDate.format("D MMMM YYYY");
    const endDateSelected =
      this.globals.dateSelected?.endDate.format("D MMMM YYYY");

    if (citytSelected === '' || startDateSelected === undefined || endDateSelected === undefined) {

    } else {
      this.title =
        citytSelected + " - " + startDateSelected + " - " + endDateSelected;
    }

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
