import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { About } from './about/about.component';
import {Forecast} from './forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    About,
    Forecast
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent, About, Forecast]
})
export class AppModule { }
