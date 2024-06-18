import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private dropdownOpenSource = new BehaviorSubject<boolean>(false);


  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  public latitude = 44.44;
  public longitude = 26.11;

  public usernameKey = 'username';

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
    this.router.events.subscribe(event => {
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

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);

    this.validateToken().subscribe(user => {
      console.log('User:', user);
      localStorage.setItem(this.usernameKey, user.username);
    });
  }

  validateToken(): Observable<User> {
    const urlBackend = environment.authenticationServiceUrl + "/authService/validateToken";

    const options = {
      observe: 'response' as 'response'  // Correct usage for the observe option
    };

    const body = {
      token: this.getAccessToken()
    }

    return this.http.post(urlBackend, body, options).pipe(
      map(response => {
        console.log('Profile response:', response);
        return response.body as User;
      }),
      catchError(error => {
        console.error('Backend error:', error);
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
      console.log('Access token is null');
      return 'default';
    }
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  areTokensSet(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken() && this.getAccessToken() !== 'default';
  }

}
