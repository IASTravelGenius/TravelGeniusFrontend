import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirestoreService } from "../services/firestore.service";
import { PosthogService } from "../services/posthog.service";

@Component({
  selector: "app-email-opt-in",
  templateUrl: "./email-opt-in.component.html",
  styleUrls: ["./email-opt-in.component.css"],
})
export class EmailOptInComponent implements OnInit {
  email: string = "";

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    private posthog: PosthogService
  ) {}

  ngOnInit(): void {
    this.posthog.trackEvent('$pageview')
  }

  onSkip() {
    this.posthog.trackEvent("newsletter skipped");
    this.navigateToMaintenance();
  }

  async onSubmit() {
    if (this.email === "") {
      alert("Please provide an email");
      this.posthog.trackEvent("submit to newsletter with empty email");
    } else if (this.email.trim()) {
      try {
        await this.firestore.createDoc("users", { email: this.email });
        alert("Thank you for subscribing!");
      } catch (error) {
        console.error("Error saving email to Firestore:", error);
      } finally {
        console.log("i get here");
        this.posthog.identifyUser(this.generateGUID(), { email: this.email });
        this.posthog.trackEvent("submit to newsletter");
      }
    }

    if (this.email === "") {
    } else {
      this.navigateToMaintenance();
    }
  }

  navigateToMaintenance() {
    // Simulate a delay for loading animation
    setTimeout(() => {
      this.router.navigate(["/maintenance"]);
    }, 1000); // 1 second delay for loading effect
  }

  generateGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0; // Generate a random number between 0 and 15
      const value = char === "x" ? random : (random & 0x3) | 0x8; // Ensure y-format in UUID
      return value.toString(16); // Convert to hexadecimal
    });
  }
}
