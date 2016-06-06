// home.component.ts

import { Component } from '@angular/core';

import { SearchBarComponent } from '../../shared/index';

@Component({
  templateUrl: 'app/routes/home/home.component.html',
  directives: [ SearchBarComponent ]
})

export class HomeComponent { }
