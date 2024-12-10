import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const cardsContainer = document.querySelector(".destination-cards");

    if (prevButton != null && nextButton != null && cardsContainer != null){
      // Scroll left when the "prev" button is clicked
      prevButton.addEventListener("click", () => {
        cardsContainer.scrollBy({
          left: -300, // Scroll by 300px to the left
          behavior: "smooth",
        });
      });

      // Scroll right when the "next" button is clicked
      nextButton.addEventListener("click", () => {
        cardsContainer.scrollBy({
          left: 300, // Scroll by 300px to the right
          behavior: "smooth",
        });
      });
    }
  }

}
