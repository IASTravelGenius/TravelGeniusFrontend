import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
// import { MatSliderValueAccessor } from './mat-slider-accessor';
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

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
import { TouristicAttractionComponent } from './touristic-attraction/touristic-attraction.component';
import { TouristicAttractionsAllComponent } from './touristic-attractions-all/touristic-attractions-all.component';
import { TouristicAttractionsResultsComponent } from './touristic-attractions-results/touristic-attractions-results.component';
import { MatSliderAccessorDirective } from './mat-slider-accessor.directive';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EmailOptInComponent } from './email-opt-in/email-opt-in.component';
import { MaintenanceComponent } from './maintenance/maintenance.component'; // Import MatAutocompleteModule
import { environment } from "../environments/environment";
import { PlanTripComponent } from './plan-trip/plan-trip.component';
import { DestinationSuggestionComponent } from './destination-suggestion/destination-suggestion.component';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { CarouselModule } from "primeng/carousel";
import { FoodPageComponent } from './food-page/food-page.component';
import { ResultPageComponent } from './result-page/result-page.component';


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
    TouristicAttractionComponent,
    TouristicAttractionsAllComponent,
    TouristicAttractionsResultsComponent,
    MatSliderAccessorDirective,
    StarRatingComponent,
    LandingPageComponent,
    EmailOptInComponent,
    MaintenanceComponent,
    PlanTripComponent,
    DestinationSuggestionComponent,
    SuggestionCardComponent,
    DateTimeComponent,
    FoodPageComponent,
    ResultPageComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    DragDropModule,
    MatSliderModule,
    NgxDaterangepickerMd,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
