import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private dropdownOpenSource = new BehaviorSubject<boolean>(false);
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  dropdownOpen$ = this.dropdownOpenSource.asObservable();

  setDropdownOpen(isOpen: boolean) {
    this.dropdownOpenSource.next(isOpen);
  }

  closeDropdown() {
    this.dropdownOpenSource.next(false);
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  areTokensSet(): boolean {
    return this.accessToken !== null && this.refreshToken !== null;
  }
}
