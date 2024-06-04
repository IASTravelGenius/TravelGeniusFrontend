import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordValidations = {
    match: false,
    minLength: false,
    upperLowerCase: false,
    number: false,
    specialChar: false
  };

  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private globalsService: GlobalsService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(80)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.usernameValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^[a-zA-Z0-9_]+$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  validatePassword() {
    const password = this.registerForm.get('password')?.value || '';
    const confirmPassword = this.registerForm.get('confirmPassword')?.value || '';

    this.passwordValidations.match = password === confirmPassword;
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.upperLowerCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    this.passwordValidations.number = /[0-9]/.test(password);
    this.passwordValidations.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  allValidationsMet(): boolean {
    return Object.values(this.passwordValidations).every(validation => validation);
  }

  isEmailInvalid(): boolean {
    const emailControl = this.registerForm.get('email');
    return !!(emailControl && emailControl.invalid && emailControl.touched);
  }

  getEmailErrors(): string[] {
    const emailControl = this.registerForm.get('email');
    const errors = [];
    if (emailControl?.errors?.['required']) {
      errors.push('* email is required');
    }
    if (emailControl?.errors?.['email']) {
      errors.push('* this is not a valid email address');
    }
    if (emailControl?.errors?.['minlength']) {
      errors.push('* email must be at least 3 characters');
    }
    if (emailControl?.errors?.['maxlength']) {
      errors.push('* email must be at most 80 characters');
    }
    return errors;
  }

  isUsernameInvalid(): boolean {
    const usernameControl = this.registerForm.get('username');
    return !!(usernameControl && usernameControl.invalid && usernameControl.touched);
  }

  getUsernameErrors(): string[] {
    const usernameControl = this.registerForm.get('username');
    const errors = [];
    if (usernameControl?.errors?.['required']) {
      errors.push('* username is required');
    }
    if (usernameControl?.errors?.['minlength']) {
      errors.push('* username must be at least 4 characters');
    }
    if (usernameControl?.errors?.['maxlength']) {
      errors.push('* username must be at most 20 characters');
    }
    if (usernameControl?.errors?.['invalidUsername']) {
      errors.push('* username must contain only letters, numbers, and underscores');
    }
    return errors;
  }

  // onSubmit() {
  //   if (this.registerForm.valid && this.allValidationsMet()) {
  //     const { email, username, password } = this.registerForm.value;
  //     this.globalsService.setTokens('accessToken', 'refreshToken');
  //     this.router.navigate(['/home']);
  //     this.http.post('/authService/register', { username, email, password }).subscribe((response: any) => {
  //       this.globalsService.setTokens(response.accessToken, response.refreshToken);
  //       console.log('Tokens saved:', response.accessToken, response.refreshToken);
  //       this.router.navigate(['/home']);
  //     }, error => {
  //       console.error('Registration error:', error);
  //     });
  //   }
  // }

  onSubmit() {
    if (this.registerForm.valid && this.allValidationsMet()) {
      const { email, username, password } = this.registerForm.value;
      const requestBody = {
        username: username,
        email: email,
        password: password
      };

      const url = environment.authenticationServiceUrl + '/authService/register';

      this.http.post(url, requestBody, { observe: 'response' }).subscribe((response: any) => {
        console.log(response.status);
        if (response.error === null) {
          this.globalsService.setTokens(response.accessToken, response.refreshToken);
          console.log('Tokens saved:', response.accessToken, response.refreshToken);
          this.router.navigate(['/home']);
        } else {
          console.error('Registration error:', response.error);
          this.errorMessage = response.error.error.error;
        }
      }, error => {
        const errorObject = error.error;
        console.log(errorObject);
        const errorString = errorObject.error;
        console.error('Registration error:', errorString);
        this.errorMessage = errorString;
      });
    }
  }

}
