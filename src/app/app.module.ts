import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';  // Import FormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { NewsComponent } from './news/news.component';
import { FlightsComponent } from './flights/flights.component';
import { MustSeeComponent } from './must-see/must-see.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatInputModule } from '@angular/material/input';  // Import Angular Material modules
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TouristicAttractionComponent } from './touristic-attraction/touristic-attraction.component'; // Import MatAutocompleteModule


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    NewsComponent,
    FlightsComponent,
    MustSeeComponent,
    ProfileComponent,
    HeaderComponent,
    CountryComponent,
    CityComponent,
    RegisterComponent,
    LoginComponent,
    SettingsComponent,
    TouristicAttractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
