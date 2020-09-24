import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

import { CloseAlert } from './directive/close.directive'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovidComponent } from './covid/covid.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryComponent } from './covid/country/country.component';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/login/auh.guard';
import { CookDashComponent } from './cook-dash/cook-dash.component';
import { PageNotFoundComponent } from './misc/page-not-found/page-not-found.component';
import { AddCountryComponent } from './covid/add-country/add-country.component';
import { IndiaComponent } from './india/india.component';
import { ScrollCardComponent } from './components/scroll-card/scroll-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CloseAlert,
    CovidComponent,
    CountryComponent,
    CookDashComponent,
    PageNotFoundComponent,
    AddCountryComponent,
    IndiaComponent,
    ScrollCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [ AuthGuard, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
