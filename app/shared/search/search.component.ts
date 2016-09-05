// search.component.ts

import { Component } from '@angular/core';
import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { ProfileModel, ProfileViewComponent } from '../../shared/index';

@Component({
  selector: 'search',
  inputs: ['query','year','sortBy','showSummary'],
  templateUrl: 'app/shared/search/search.component.html',
  directives: [ ROUTER_DIRECTIVES, ProfileViewComponent ]
})

export class SearchResultsComponent {
  query: string;
  year: string;
  profile_results: ProfileModel[] = [];
  partial_results: ProfileModel[] = [];
  profileIndex: number = 0;
  sortBy: string;
  showSummary: boolean;

  constructor(private req: RequestService ) {
  }

  ngOnInit() {
    this.req.get("/search/"+this.year+"/"+this.query, (data) => {
      this.profile_results = (data.results || []).map((r) => {
        r.year = this.year;
        return new ProfileModel(r);
      });
      if(this.sortBy){
        this.profile_results.sort((aProfile,bProfile)=> {
          var a = aProfile[this.sortBy] || 0;
          var b = bProfile[this.sortBy] || 0;
          return b - a;
        });
      }
      this.showMore();
    }, null);
  }
  ngOnChanges() {
    this.profileIndex = 0;
    this.profile_results = [];
    this.partial_results = [];
    this.req.get("/search/"+this.year+"/"+this.query, (data) => {
      this.profile_results = (data.results || []).map((r) => {
        r.year = this.year;
        return new ProfileModel(r);
      });
      if(this.sortBy){
        this.profile_results.sort((aProfile,bProfile)=> {
          var a = aProfile[this.sortBy] || 0;
          var b = bProfile[this.sortBy] || 0;
          return b - a;
        });
      }
      this.showMore();
    }, null);
  }

  showMore(){
    for (var i = 0; i <= 11; i++) {
      if(this.profile_results[this.profileIndex]){
        this.partial_results.push(this.profile_results[this.profileIndex]);
        this.profileIndex++;
      }
    }
  }
  decodeURI(query: string){
    return decodeURIComponent(query).replace('=',': ').replace(';',',').replace('_'," ");
  }
}
