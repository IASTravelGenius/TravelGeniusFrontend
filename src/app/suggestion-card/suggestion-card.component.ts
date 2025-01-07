import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalsService } from '../globals.service';

@Component({
  selector: "app-suggestion-card",
  templateUrl: "./suggestion-card.component.html",
  styleUrls: ["./suggestion-card.component.css"],
  standalone: false,
})
export class SuggestionCardComponent implements OnInit {
  @Input() destination!: { name: string; image: string; rating: number };

  constructor(private router: Router, private globals: GlobalsService) {}

  ngOnInit(): void {}

  onLocationChoosed(): void {
    this.globals.citySelected = this.destination.name

    setTimeout(() => {
      this.router.navigate(["/date-time"]);
    }, 1000);
  }
}
