// app.component.ts
// the main router component

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { API_ENDPOINT, SearchBarComponent } from './shared/index';
import {
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  SearchComponent,
  UpdateComponent,
  SuperSearchComponent
} from './routes/index';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  providers: [ Title ],
  directives: [ ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES, SearchBarComponent ]
})

@Routes([
  { path: '/', component: HomeComponent },
  { path: '/login', component: LoginComponent },
  { path: '/profile/:username/:year', component: ProfileComponent },
  { path: '/profile/:username', component: ProfileComponent },
  { path: '/search/:query/:year', component: SearchComponent },
  { path: '/search/:query', component: SearchComponent },
  { path: '/update', component: UpdateComponent },
  { path: '/supersearch', component: SuperSearchComponent }
])

export class AppComponent implements OnInit {
  backgroundHash: boolean = false;
  backgroundImageUrl: string = "https://aswwu.com/media/background.php?date="+(new Date()).getTime();
  hasVerified: boolean = false;

  constructor(
    private loc: Location,
    private req: RequestService,
    private router: Router,
    private title: Title,
    private viewContainerRef: ViewContainerRef
  ) {
    req.API_ENDPOINT = API_ENDPOINT;

    this.router.changes.subscribe(() => {
      this.setTitle();
    });
  }

  ngOnInit() {
    this.req.verify(data => {
      this.hasVerified = true;
    });
  }

  setTitle() {
    let path = this.loc.path().split('/').filter((a) => {
      return a.length > 2;
    }).map((a) => {
      return a.charAt(0).toUpperCase() + a.slice(1);
    }).join(' | ');
    let hash = true;
    if (path.length < 5) {
      path = "the ASWWU Mask";
      hash = false;
    }
    this.backgroundHash = hash;
    this.title.setTitle(path);
  }
}
