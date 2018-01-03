import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthHelper } from './authHelper/authHelper';

import { HomeComponent } from './components/home/home.component';
import { AppMenuComponent } from './shared/app-menu/app-menu.component';
import { LoginComponent } from './components/login/login.component';

// Services
import { Logger } from './services/logger.service';
import { PeopleFinderComponent } from './components/people-finder/people-finder.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppMenuComponent,
    LoginComponent,
    PeopleFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthHelper, Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
