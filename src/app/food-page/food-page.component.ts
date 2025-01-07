import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-food-page",
  templateUrl: "./food-page.component.html",
  styleUrl: "./food-page.component.css",
  standalone: false,
})
export class FoodPageComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  onNavigateToResult(): void {
    setTimeout(() => {
      this.router.navigate(['/result-page'])
    }, 1000)
  }
}
