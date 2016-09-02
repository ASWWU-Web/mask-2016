// home.component.ts

import { Component } from '@angular/core';

//import { RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { SearchBarComponent, SearchResultsComponent, CURRENT_YEAR  } from '../../shared/index';

import { RequestService } from 'aswwu-requests/aswwu-requests';

@Component({
  templateUrl: 'app/routes/home/home.component.html',
  directives: [ SearchBarComponent, SearchResultsComponent],
  styleUrls: [ 'app/routes/home/home.styles.css' ]
})

export class HomeComponent {
  year: string = CURRENT_YEAR;

}
