import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { CountriesComponent } from './countries/countries.component';
import { NewsComponent } from './news/news.component';
import { FlightsComponent } from './flights/flights.component';
import { TouristicAttractionsResultsComponent } from './touristic-attractions-results/touristic-attractions-results.component';
import { CityComponent } from './city/city.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TouristicAttractionComponent } from './touristic-attraction/touristic-attraction.component';
import { TouristicAttractionsAllComponent } from './touristic-attractions-all/touristic-attractions-all.component';
import {LandingPageComponent} from './landing-page/landing-page.component'
import { EmailOptInComponent } from './email-opt-in/email-opt-in.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { PlanTripComponent } from './plan-trip/plan-trip.component';
import { DestinationSuggestionComponent } from './destination-suggestion/destination-suggestion.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { ResultPageComponent } from './result-page/result-page.component';


const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "landing-page", component: LandingPageComponent },
  { path: "email-opt-in", component: EmailOptInComponent },
  { path: "maintenance", component: MaintenanceComponent },
  { path: "plan-trip", component: PlanTripComponent },
  { path: "destination-suggestion", component: DestinationSuggestionComponent },
  { path: "date-time", component: DateTimeComponent },
  { path: "food-page", component: FoodPageComponent },
  { path: "result-page", component: ResultPageComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'countries', component: CountriesComponent },
  // { path: 'countries/:countryId', component: CountryComponent},
  // , children: [
  // { path: ':cityId', component: CityComponent },
  // ]},
  // { path: 'countries/:countryId/:cityId', component: CityComponent},
  // { path: 'countries/:countryId/ta/:touristicAttractionId', component: TouristicAttractionComponent},
  // { path: 'news', component: NewsComponent },
  // { path: 'flights', component: FlightsComponent },
  // { path: 'touristic-attractions', component: TouristicAttractionsAllComponent },
  // { path: 'touristic-attractions/:latitude/:longitude/:range', component: TouristicAttractionsResultsComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'profile', component: ProfileComponent},
  // { path: 'settings', component: SettingsComponent},

  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
