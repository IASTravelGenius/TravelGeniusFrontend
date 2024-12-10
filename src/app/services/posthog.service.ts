import { Injectable } from "@angular/core";
import posthog from "posthog-js";

@Injectable({
  providedIn: "root",
})
export class PosthogService {

  // Track an event
  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    posthog.capture(eventName, properties);
  }

  // Identify a user
  identifyUser(userId: string, properties: Record<string, any> = {}) {
    posthog.identify(userId, properties);
  }

  // Set user properties
  setUserProperties(properties: Record<string, any>) {
    posthog.people.set(properties);
  }
}
