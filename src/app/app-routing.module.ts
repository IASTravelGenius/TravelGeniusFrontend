import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { CountriesComponent } from './countries/countries.component';
import { NewsComponent } from './news/news.component';
import { FlightsComponent } from './flights/flights.component';
import { MustSeeComponent } from './must-see/must-see.component';
import { CityComponent } from './city/city.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TouristicAttractionComponent } from './touristic-attraction/touristic-attraction.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:countryId', component: CountryComponent},
  // , children: [
  // { path: ':cityId', component: CityComponent },
  // ]},
  { path: 'countries/:countryId/:cityId', component: CityComponent},
  { path: 'countries/:countryId/ta/:touristicAttractionId', component: TouristicAttractionComponent},
  { path: 'news', component: NewsComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'must-see', component: MustSeeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'settings', component: SettingsComponent},

  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
