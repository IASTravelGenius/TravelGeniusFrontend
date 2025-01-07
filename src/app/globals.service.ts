import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './models/user';
import { Deal } from './models/deal';
import { Profile } from './models/profile.interface';
import { of } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class GlobalsService {
  private dropdownOpenSource = new BehaviorSubject<boolean>(false);

  citySelected: string = "";
  dateSelected: { startDate: moment.Moment; endDate: moment.Moment } | undefined;

  private accessTokenKey = "accessToken";
  private refreshTokenKey = "refreshToken";

  public latitude = 44.44;
  public longitude = 26.11;

  public usernameKey = "username";
  public userPhotoKey = "userPhoto";

  public userPhoto = "assets/download.jpeg";

  dropdownOpen$ = this.dropdownOpenSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    // Initialize tokens from localStorage
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (accessToken && refreshToken) {
      this.setTokens(accessToken, refreshToken);
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeDropdown();
      }
    });
  }

  setDropdownOpen(isOpen: boolean) {
    this.dropdownOpenSource.next(isOpen);
  }

  closeDropdown() {
    this.setDropdownOpen(false);
  }

  getProfile(): Observable<Profile> {
    const urlBackend = environment.backendUrl + "/user/completeProfile";
    const headers_dict = {
      Authorization: "Bearer " + this.getAccessToken(),
    };
    const options = {
      headers: new HttpHeaders(headers_dict),
      observe: "response" as "response", // Correct usage for the observe option
    };

    return this.http.get<Profile>(urlBackend, options).pipe(
      map((response) => {
        console.log("Profile response:", response);
        return response.body as Profile;
      }),
      catchError((error) => {
        console.error("Backend error:", error);
        return throwError(error);
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);

    this.validateToken().subscribe((user) => {
      console.log("User:", user);
      localStorage.setItem(this.usernameKey, user.username);
    });

    this.getProfile().subscribe((profile) => {
      console.log("Profile:", profile);
      localStorage.setItem(this.userPhotoKey, profile.profilePhoto.photoUrl);
      this.userPhoto = profile.profilePhoto.photoUrl;
    });
  }

  validateToken(): Observable<User> {
    const urlBackend =
      environment.authenticationServiceUrl + "/authService/validateToken";

    const options = {
      observe: "response" as "response", // Correct usage for the observe option
    };

    const body = {
      token: this.getAccessToken(),
    };

    return this.http.post(urlBackend, body, options).pipe(
      map((response) => {
        console.log("Profile response:", response);
        return response.body as User;
      }),
      catchError((error) => {
        console.error("Backend error:", error);
        return throwError(error);
      })
    );
    // return this.http.get<User>(urlBackend, options).pipe(
    //   map(response => {
    //     console.log('Profile response:', response);
    //     return response.body as Profile;
    //   }),
    //   catchError(error => {
    //     console.error('Backend error:', error);
    //     return throwError(error);
    //   })
    // );
  }

  getAccessToken(): string | null {
    if (!localStorage.getItem(this.accessTokenKey)) {
      console.log("Access token is null");
      return "default";
    }
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getUserPhoto(): string | null {
    return localStorage.getItem(this.userPhotoKey);
  }

  getUserPhotoObservable(): Observable<string> {
    return of(
      localStorage.getItem(this.userPhotoKey) || "assets/download.jpeg"
    );
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.usernameKey);
  }

  areTokensSet(): boolean {
    return (
      !!this.getAccessToken() &&
      !!this.getRefreshToken() &&
      this.getAccessToken() !== "default"
    );
  }

  navigateToDeal(deal: Deal) {
    console.log(deal);
    if (deal.entityType === "TOURISTIC_ATTRACTION")
      this.router.navigate([
        "/countries",
        "generic",
        "ta",
        deal.name.toLowerCase() + "_" + deal.id,
      ]);
    else if (deal.entityType === "CITY")
      this.router.navigate([
        "/countries",
        "search",
        deal.name.toLowerCase() + "_" + deal.id,
      ]);
    else
      this.router.navigate([
        "/countries",
        deal.name.toLowerCase() + "_" + deal.id,
      ]);
  }
}
