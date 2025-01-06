import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirestoreService } from "../services/firestore.service";
import { PosthogService } from "../services/posthog.service";

@Component({
  selector: "app-maintenance",
  templateUrl: "./maintenance.component.html",
  styleUrls: ["./maintenance.component.css"],
})
export class MaintenanceComponent implements OnInit {
  email: string = "";

  constructor(
    private router: Router,
    private firestore: FirestoreService,
    private posthog: PosthogService
  ) {}

  ngOnInit(): void {
    this.posthog.trackEvent("$pageview");
  }

  async onSubmit() {
    if (this.email === "") {
      alert("Please provide an email");
      this.posthog.trackEvent("submit for services with empty email");
    } else if (this.email.trim()) {
      try {
        await this.firestore.createDoc("users", { email: this.email });
        alert("Thank you for subscribing!");
      } catch (error) {
        console.error("Error saving email to Firestore:", error);
      } finally {
        this.posthog.identifyUser(this.generateGUID(), { email: this.email });
        this.posthog.trackEvent("submit for services");
      }
    }

    if (this.email === "") {
    } else {
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 1000);
    }
  }

  generateGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0; // Generate a random number between 0 and 15
      const value = char === "x" ? random : (random & 0x3) | 0x8; // Ensure y-format in UUID
      return value.toString(16); // Convert to hexadecimal
    });
  }
}
