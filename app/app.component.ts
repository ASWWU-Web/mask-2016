// app.component.ts
// the main router component

import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import { API_ENDPOINT } from './shared/index';
import {
  HomeComponent,
  LoginComponent
} from './routes/index';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})

@Routes([
  { path: '/', component: HomeComponent },
  { path: '/login', component: LoginComponent }
])

export class AppComponent implements OnInit {
  constructor( private req: RequestService ) {
    req.API_ENDPOINT = API_ENDPOINT;
  }

  ngOnInit() {
    this.req.verify(null);
  }
}
