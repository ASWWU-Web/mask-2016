// update.component.ts

import { Component } from '@angular/core';
import { Router, OnActivate } from '@angular/router';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import {
  CURRENT_YEAR, ProfileViewComponent, ProfileModel,
  FieldsInOrder, SelectFields, SearchableFields
} from '../../shared/index';

@Component({
  templateUrl: 'app/routes/update/update.component.html',
  directives: [ ProfileViewComponent ],
  styleUrls: [ 'app/routes/update/update.styles.css' ]
})

export class UpdateComponent implements OnActivate {
  profile: ProfileModel;
  fieldsInOrder: string[] = FieldsInOrder;
  selectFields: Object = SelectFields;
  searchableFields: Object = SearchableFields;

  constructor( private req: RequestService, private router: Router ) { }

  routerOnActivate() { this.load(this); }

  load(self: any) {
    if (!self.req || !self.req.hasVerified) {
      setTimeout(() => {self.load(self);}, 100);
    } else if (!self.req.isAuthenticated()) {
      self.router.navigate(['/login']);
    } else {
      let user = self.req.getUser();
      self.req.get("/profile/"+CURRENT_YEAR+"/"+user['username'], (data) => {
        data.year = CURRENT_YEAR;
        self.profile = new ProfileModel(data);
      }, null);
    }
  }

  saveProfile(): void {
    let data = JSON.parse(JSON.stringify(this.profile));
    this.req.post("/update/"+this.profile.username, data, res => {
      console.log(res);
    }, null);
  }

  displayKey(key: string): string { return key.replace(/_/g, ' '); }

  setSearchableField(key: string, field: string): void {
    let items = this.profile[key].split(',').map((a) => {return a.trim();}).filter((a) => {return a != '';});
    items.pop();
    items.push(field);
    items.push('');
    this.profile[key] = items.join(', ');
    try {
      document.getElementById('input_' + key).focus();
    } catch(e) { }
  }
}
