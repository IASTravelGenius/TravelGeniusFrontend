import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../openai.service';
import { Router } from '@angular/router';
import { PosthogService } from '../services/posthog.service';

@Component({
  selector: "app-plan-trip",
  templateUrl: "./plan-trip.component.html",
  styleUrls: ["./plan-trip.component.css"],
  standalone: false,
})
export class PlanTripComponent implements OnInit {
  searchContent: string = "";

  constructor(
    private openaiService: OpenaiService,
    private router: Router,
    private posthog: PosthogService
  ) {}

  ngOnInit(): void {this.posthog.trackEvent("$pageview");}

  onSubmit(): void {
    this.posthog.trackEvent("Search Button Clicked", {
      search_query: this.searchContent,
      timestamp: new Date().toISOString(),
    });

    if (this.searchContent === "") {
      alert("Please provide search parameters");
    } else {
      // this.openaiService.generateText(this.searchContent).subscribe({
      //   next: (response) => {
      //     const content = response["choices"][0]["message"]["content"];
      //     const lines = content.split('\n');
      //     lines.shift()
      //     lines.pop()
      //     const cleanedContent = lines.join('\n');
      //     console.log(cleanedContent);
      //     console.log(JSON.parse(cleanedContent));
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
      setTimeout(() => {
        this.router.navigate(["/destination-suggestion"]);
      }, 1000);
    }
  }

  onFocus(): void {
    this.posthog.trackEvent("Search Input Focused", {
      timestamp: new Date().toISOString(),
    });
  }
}
