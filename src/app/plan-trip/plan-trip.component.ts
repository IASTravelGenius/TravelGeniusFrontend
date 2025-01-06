import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../openai.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-plan-trip",
    templateUrl: "./plan-trip.component.html",
    styleUrls: ["./plan-trip.component.css"],
    standalone: false
})
export class PlanTripComponent implements OnInit {
  searchContent: string = "a";

  constructor(private openaiService: OpenaiService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.searchContent === "") {
      alert("Please provide search parameters");
    } else {
      setTimeout(() => {
        this.router.navigate(["/destination-suggestion"]);
      }, 1000);
    }
  }
}
