// search-bar.component.ts

import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { CURRENT_YEAR } from '../../shared/index';

@Component({
  selector: 'search-bar',
  template: `
    <input class="form-control" [(ngModel)]="query" (focus)="search()" (keyup)="search()" (keyup.enter)="goSearch()" (unfocus)="showResults = false" placeholder="Searcheth...">
    <div *ngIf="showResults" class='search-bar-results'>
      <h5 *ngFor="let r of results; let i = index" (click)="showResults = false">
        <a *ngIf="r.full_name && i < 10" [routerLink]="['/profile', r.username]">{{r.full_name}}</a>
      </h5>
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES ],
  styleUrls: [ 'app/shared/search-bar/search-bar.styles.css' ]
})

export class SearchBarComponent{
  query: string = "";
  year: string = CURRENT_YEAR;
  results: any[] = [];
  showResults: boolean = false;


  constructor( private req: RequestService, private router: Router ) { }

  search(): void {
    this.showResults = true;
    if (this.query.length < 3) this.results = [];
    else {
      this.req.get("/search/"+this.year+"/"+this.query, (data) => {
        this.results = data.results.sort(function(a, b) { return b.views - a.views; });
      }, null);
    }
  }

  goSearch(): void {
    this.showResults = false;
    this.router.navigate(['/search', encodeURIComponent(this.query)]);
  }
}
