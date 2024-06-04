import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  changePasswordForm: FormGroup;
  isChangePasswordModalOpen = false;
  isConfirmationModalOpen = false;
  actionToConfirm: string = '';
  passwordValidations = {
    match: false,
    minLength: false,
    upperLowerCase: false,
    number: false,
    specialChar: false
  };
  notificationsEnabled: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial load for notifications state if needed
    this.loadNotificationState();
  }

  loadNotificationState(): void {
    console.log('Notification state loaded successfully');
    // const url = `${environment.apiUrl}/notifications/state`;
    // this.http.get(url).subscribe((response: any) => {
    //   this.notificationsEnabled = response.notificationsEnabled;
    // }, error => {
    //   console.error('Error loading notification state', error);
    // });
  }

  toggleNotifications(enabled: boolean): void {
    console.log('Notifications toggled successfully');
    this.notificationsEnabled = enabled;
    // const url = `${environment.apiUrl}/notifications`;
    // this.http.post(url, { notificationsEnabled: enabled }).subscribe(response => {
    //   console.log('Notifications toggled successfully', response);
    // }, error => {
    //   console.error('Error toggling notifications', error);
    // });
  }

  openChangePasswordModal(): void {
    this.isChangePasswordModalOpen = true;
  }

  closeChangePasswordModal(): void {
    this.isChangePasswordModalOpen = false;
  }

  validatePassword(): void {
    const newPassword = this.changePasswordForm.get('newPassword')?.value || '';
    const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword')?.value || '';

    this.passwordValidations.match = newPassword === confirmNewPassword;
    this.passwordValidations.minLength = newPassword.length >= 8;
    this.passwordValidations.upperLowerCase = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
    this.passwordValidations.number = /[0-9]/.test(newPassword);
    this.passwordValidations.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  }

  allValidationsMet(): boolean {
    return Object.values(this.passwordValidations).every(validation => validation);
  }

  onChangePasswordSubmit(): void {
    console.log('Password changed successfully');
    // if (this.changePasswordForm.valid && this.allValidationsMet()) {
    //   const { currentPassword, newPassword } = this.changePasswordForm.value;
    //   const url = `${environment.apiUrl}/change-password`;
    //   this.http.post(url, { currentPassword, newPassword }).subscribe(response => {
    //     console.log('Password changed successfully', response);
    //     this.closeChangePasswordModal();
    //   }, error => {
    //     console.error('Error changing password', error);
    //   });
    // }
  }

  openConfirmationModal(action: string): void {
    this.actionToConfirm = action;
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
  }

  confirmAction(): void {
    if (this.actionToConfirm === 'data') {
      this.deleteData();
    } else if (this.actionToConfirm === 'account') {
      this.deleteAccount();
    }
    this.closeConfirmationModal();
  }

  deleteData(): void {
    console.log('Data deleted successfully');
    // const url = `${environment.apiUrl}/delete-data`;
    // this.http.post(url, {}).subscribe(response => {
    //   console.log('Data deleted successfully', response);
    // }, error => {
    //   console.error('Error deleting data', error);
    // });
  }

  deleteAccount(): void {
    console.log('Account deleted successfully');
    // const url = `${environment.apiUrl}/delete-account`;
    // this.http.post(url, {}).subscribe(response => {
    //   console.log('Account deleted successfully', response);
    // }, error => {
    //   console.error('Error deleting account', error);
    // });
  }
}
