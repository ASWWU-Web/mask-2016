// profile-view.component.ts

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {
  CURRENT_YEAR,
  ProfileModel,
  FieldsInOrder
} from '../../shared/index';

@Component({
  selector: 'profile-view',
  inputs: [ 'profile', 'size' ],
  templateUrl: 'app/shared/profile-view/profile-view.component.html',
  styleUrls: [ 'app/shared/profile-view/profile-view.styles.css' ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class ProfileViewComponent {
  CURRENT_YEAR: string = CURRENT_YEAR;
  size: string = "tiny";
  profile: ProfileModel;

  fieldsInOrder: string[] = FieldsInOrder;

  displayKey(key: string): string { return key.replace(/_/g, ' '); }
  encode(stuff: string){
    return encodeURIComponent(stuff);
  }
}
