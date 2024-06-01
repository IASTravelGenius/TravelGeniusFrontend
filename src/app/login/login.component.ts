import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private globalsService: GlobalsService
  ) {
    this.loginForm = this.fb.group({
      usernameEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { usernameEmail, password } = this.loginForm.value;
      this.globalsService.setTokens('accesstoken', 'refreshtoken');
      this.router.navigate(['/home']);
      // this.http.post('/api/login', { usernameEmail, password }).subscribe((response: any) => {
      //   this.globalsService.setTokens(response.accessToken, response.refreshToken);
      //   console.log('Tokens saved:', response.accessToken, response.refreshToken);
      //   this.router.navigate(['/home']);
      // }, error => {
      //   console.error('Login error:', error);
      // });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
