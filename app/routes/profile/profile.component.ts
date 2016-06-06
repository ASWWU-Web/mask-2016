// profile.component.ts

import { Component } from '@angular/core';
import { RouteSegment, OnActivate } from '@angular/router';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { CURRENT_YEAR, ProfileModel, ProfileViewComponent } from '../../shared/index';

@Component({
  template: `
    <div class="container flex-content flex-true">
      <profile-view [profile]="profile" [size]="'full'"></profile-view>
    </div>
  `,
  directives: [ ProfileViewComponent ]
})

export class ProfileComponent implements OnActivate {
  username: string;
  year: string;
  profile: ProfileModel;

  constructor( curr: RouteSegment, private req: RequestService ) {
    this.username = curr.getParam('username');
    this.year = curr.getParam('year') || CURRENT_YEAR;
  }

  routerOnActivate() {
    this.req.get("/profile/"+this.year+"/"+this.username, (data) => {
      data.year = this.year;
      this.profile = new ProfileModel(data);
    }, null);
  }
}
