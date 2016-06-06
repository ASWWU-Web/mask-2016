// app.component.ts
// the main router component

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { API_ENDPOINT, SearchBarComponent } from './shared/index';
import {
  HomeComponent,
  LoginComponent,
  ProfileComponent,
  SearchComponent
} from './routes/index';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [ ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES, SearchBarComponent ]
})

@Routes([
  { path: '/', component: HomeComponent },
  { path: '/login', component: LoginComponent },
  { path: '/profile/:username/:year', component: ProfileComponent },
  { path: '/profile/:username', component: ProfileComponent },
  { path: '/search/:query/:year', component: SearchComponent },
  { path: '/search/:query', component: SearchComponent }
])

export class AppComponent implements OnInit {
  constructor( private req: RequestService, private viewContainerRef: ViewContainerRef ) {
    req.API_ENDPOINT = API_ENDPOINT;
  }

  ngOnInit() {
    this.req.verify(null);
  }
}
