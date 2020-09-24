import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { CovidComponent } from './covid/covid.component';
import { CountryComponent } from './covid/country/country.component';
import { AuthGuard } from './auth/login/auh.guard';
import { PageNotFoundComponent } from './misc/page-not-found/page-not-found.component';
import { IndiaComponent } from './india/india.component';

const routes: Routes =[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path: 'login' ,component:LoginComponent},
  {path: 'home' ,component:HomeComponent},
  {path: 'register' ,component:RegisterComponent},
  {path: 'india' ,component:IndiaComponent},
  {path: 'home/:id',
  canActivate: [AuthGuard],
  component:HomeComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
