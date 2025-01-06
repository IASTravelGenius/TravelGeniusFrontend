import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
    selector: "app-destination-suggestion",
    templateUrl: "./destination-suggestion.component.html",
    styleUrls: ["./destination-suggestion.component.css"],
    standalone: false
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
    ];
  }

  ngOnInit(): void {}
}
