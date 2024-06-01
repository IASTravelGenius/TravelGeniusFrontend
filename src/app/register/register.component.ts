import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.registerForm.valid && this.allValidationsMet()) {
      // Handle the registration logic here
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
