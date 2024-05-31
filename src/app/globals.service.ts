import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private dropdownOpenSource = new BehaviorSubject<boolean>(false);
  dropdownOpen$ = this.dropdownOpenSource.asObservable();

  setDropdownOpen(isOpen: boolean) {
    this.dropdownOpenSource.next(isOpen);
  }

  closeDropdown() {
    this.dropdownOpenSource.next(false);
  }
}
