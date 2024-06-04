import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private dropdownOpenSource = new BehaviorSubject<boolean>(false);


  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  dropdownOpen$ = this.dropdownOpenSource.asObservable();

  constructor() {
    // Initialize tokens from localStorage
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (accessToken && refreshToken) {
      this.setTokens(accessToken, refreshToken);
    }
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
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  areTokensSet(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }
}
