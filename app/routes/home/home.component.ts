// home.component.ts

import { Component } from '@angular/core';

import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { SearchBarComponent, CURRENT_YEAR, ProfileModel, ProfileViewComponent  } from '../../shared/index';

import { RequestService } from 'aswwu-requests/aswwu-requests';

@Component({
  templateUrl: 'app/routes/home/home.component.html',
  directives: [ SearchBarComponent, ProfileViewComponent, ROUTER_DIRECTIVES ],
  styleUrls: [ 'app/routes/home/home.styles.css' ]
})

export class HomeComponent implements OnActivate {
  all_profiles: ProfileModel[] = [];
  top_profiles: ProfileModel[] = [];
  year: string;

  constructor(private req: RequestService ) {
    this.year = CURRENT_YEAR;
  }

  routerOnActivate() {
    this.req.get("/search/all", (data) => {
      this.all_profiles = (data.results || []).map((r) => {
        r.year = this.year;
        return new ProfileModel(r);
      }).sort((aProfile,bProfile)=> {
        var a = aProfile.views || 0;
        var b = bProfile.views || 0;
        return b - a;
      });
      for (var i = 0; i < 12; i++) {
        this.top_profiles.push(this.all_profiles[i]);
      }
    }, null);
  }

}
