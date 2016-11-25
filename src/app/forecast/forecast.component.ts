import {Component, Input} from "@angular/core";
import {ForecastResponse, getUrl} from "../api";
import {Http, Response} from "@angular/http";

import { Observable } from 'rxjs';

export interface ForecastData {
  date: string;
  temperature: number;
  main: string;
  description: string;
}

enum State {
  Loading,
  Refreshing,
  Loaded,
  Error
}

@Component({
  selector: "weather-forecast",
  viewProviders: [],
  styleUrls: ["./forecast.component.css"],
  template: `
<span *ngIf="loading" class="state">Loading...</span>
<span *ngIf="refreshing" class="state">Refreshing...</span>
<a *ngIf="loaded || error" href="javascript:;" (click) = "load()" class="state">Refresh</a>
 <h2>{{tomorrow ? 'Tomorrow' : 'Today'}}'s weather in {{location}}</h2>
 <div *ngIf="error">Failed to load data.</div>
 <ul>
 <li *ngFor="let item of data">
 <div class="item-date"> {{item.date}}</div>
 <div class="item-main"> {{item.main}}</div>
 <div class="item-description">{{item.description}}</div>
 <div class="item-temperature">{{item.temperature}} {{temperatureUnit}}</div>
 </li>
</ul>
`
})

export class Forecast {
  temperatureUnit = "degrees Celsius";

  @Input()
  tomorrow = false;
  @Input()
  location = "Montreal";

  data: ForecastData[] = [];
  state = State.Loading;

  constructor(private http: Http)  {

  }

  private load(){
    let path = "forecast?mode=json&";
    const start = "coordinate ";
    if(this.location && this.location.substring(0, start.length).toLowerCase() === start) {
      const coordinate = this.location.split(" ");
      path += `lat=${parseFloat(coordinate[1])}&lon=${parseFloat(coordinate[2])}`;
    } else {
      path += "q=" + this.location;
    }

    this.state = this.state === State.Loaded ? State.Refreshing : State.Loading;
    this.http.get(getUrl(path))
      .map((response : Response) => response.json().data)
      .subscribe(res => this.update(<ForecastResponse> res), () => this.showError());
  }

  private update(data: ForecastResponse) {

  }

  private showError() {
    this.data = [];
    this.state = State.Error;
  }

  get loading() {
    return this.state === State.Loading;
  }

  get refreshing() {
    return this.state === State.Refreshing;
  }

  get loaded() {
    return this.state === State.Loaded;
  }

  get error() {
    return this.state === State.Error;
  }
}

