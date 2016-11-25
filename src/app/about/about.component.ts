import { Component, Input } from "@angular/core";

@Component({
  selector: "about-page",
  styleUrls: ['./about.component.css'],
  template: `
    <h2>About</h2>
    This widget shows the weather forecast of 
    <a [href]="'https://maps.google.com/?q=' + encodedLocation">{{location}}</a> 
    The next 24 hours are shown under 'Today' and the forecast of
    24-48 hours under 'Tomorrow'
    <br/>
    <a *ngIf="collapsed" href="javascript:;" (click)="show()">Show more</a>
    <div *ngIf="!collapsed">
    <a href="javascript:;" (click)="hide()">Show less</a>
    <br/>
    The forecast uses data from <a href="http://openweathermap.org">Open Weather Map</a>
    <br/>
</div>
`
})
export class About {
  @Input()

  location: string = "Montreal";
  collapsed = true;

  get encodedLocation() {
    return encodeURIComponent(this.location);
  }

  show() {
    this.collapsed = false;
  }

  hide() {
    this.collapsed = true;
  }
}

