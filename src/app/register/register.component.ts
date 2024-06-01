import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private http: HttpClient,
    private globalsService: GlobalsService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  validatePassword() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

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

  onSubmit() {
    if (this.registerForm.valid && this.allValidationsMet()) {
      const { email, username, password } = this.registerForm.value;
      this.globalsService.setTokens('accesstoken', 'refreshtoken');
      this.router.navigate(['/home']);
      // this.http.post('/api/register', { email, username, password }).subscribe((response: any) => {
      //   this.globalsService.setTokens(response.accessToken, response.refreshToken);
      //   console.log('Tokens saved:', response.accessToken, response.refreshToken);
      //   // Redirect or handle successful registration
      // }, error => {
      //   console.error('Registration error:', error);
      // });
    }
  }
}
