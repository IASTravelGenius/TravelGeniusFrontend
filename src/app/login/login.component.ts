import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: UntypedFormBuilder,
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
      // this.globalsService.setTokens('accesstoken', 'refreshtoken');
      // this.router.navigate(['/home']);
      const requestBody = {
        usernameOrEmail: usernameEmail,
        password: password
      };

      const url = environment.authenticationServiceUrl + '/authService/login';

      this.http.post(url, requestBody).subscribe((response: any) => {
        if (response.error === null) {
          this.globalsService.setTokens(response.accessToken, response.refreshToken);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.error;
        }
      }, error => {
        const errorObject = error.error;
        console.log(errorObject);
        const errorString = errorObject.error;
        console.error('Registration error:', errorString);
        this.errorMessage = errorString;
      });
    }

      // this.http.post('/api/login', { usernameEmail, password }).subscribe((response: any) => {
      //   this.globalsService.setTokens(response.accessToken, response.refreshToken);
      //   console.log('Tokens saved:', response.accessToken, response.refreshToken);
      //   this.router.navigate(['/home']);
      // }, error => {
      //   console.error('Login error:', error);
      // });
    // }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
