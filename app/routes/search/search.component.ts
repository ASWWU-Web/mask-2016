// search.component.ts

import { Component } from '@angular/core';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { CURRENT_YEAR, ProfileModel, ProfileViewComponent } from '../../shared/index';

@Component({
  templateUrl: 'app/routes/search/search.component.html',
  directives: [ ROUTER_DIRECTIVES, ProfileViewComponent ]
})

export class SearchComponent implements OnActivate {
  query: string;
  year: string;
  profile_results: ProfileModel[] = [];

  constructor( curr: RouteSegment, private req: RequestService ) {
    this.query = curr.getParam('query');
    this.year = curr.getParam('year') || CURRENT_YEAR;
  }

  routerOnActivate() {
    this.req.get("/search/"+this.year+"/"+this.query, (data) => {
      this.profile_results = (data.results || []).map((r) => {
        r.year = this.year;
        return new ProfileModel(r);
      });
      console.log(this.profile_results);
    }, null);
  }
}
