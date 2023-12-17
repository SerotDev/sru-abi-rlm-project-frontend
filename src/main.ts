/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
  ]
});*/

import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config'; 
import { AppComponent } from './app/app.component';  

bootstrapApplication(AppComponent, appConfig)   
.catch((err) => console.error(err));