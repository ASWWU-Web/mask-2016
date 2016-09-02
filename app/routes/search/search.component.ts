// search.component.ts

import { Component } from '@angular/core';
import { RouteSegment } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CURRENT_YEAR, SearchResultsComponent } from '../../shared/index';

@Component({
  templateUrl: 'app/routes/search/search.component.html',
  directives: [ SearchResultsComponent ]
})

export class SearchComponent {
  query: string;
  year: string;

  constructor( curr: RouteSegment) {
    this.query = curr.getParam('query');
    this.year = curr.getParam('year') || CURRENT_YEAR;
  }
}
