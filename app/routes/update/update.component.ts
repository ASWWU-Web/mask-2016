// update.component.ts

import { Component } from '@angular/core';
import { Router, OnActivate } from '@angular/router';

import { RequestService } from 'aswwu-requests/aswwu-requests';

import {
  CURRENT_YEAR, MEDIA_URI, DEFAULT_PHOTO,
  ProfileViewComponent, ProfileModel,
  FieldSections, SelectFields, SearchableFields
} from '../../shared/index';

@Component({
  templateUrl: 'app/routes/update/update.component.html',
  directives: [ ProfileViewComponent ],
  styleUrls: [ 'app/routes/update/update.styles.css' ]
})

export class UpdateComponent implements OnActivate {
  MEDIA_URI: string = MEDIA_URI;
  profile: ProfileModel;
  fieldSections: string[][] = FieldSections;
  selectFields: Object = SelectFields;
  searchableFields: Object = SearchableFields;
  possiblePhotos: String[];

  constructor( private req: RequestService, private router: Router ) { }

  routerOnActivate() { this.load(this); }

  load(self: any): void {
    if (!self.req || !self.req.hasVerified) {
      setTimeout(() => {self.load(self);}, 100);
    } else if (!self.req.isAuthenticated()) {
      self.router.navigate(['/login']);
    } else {
      let user = self.req.getUser();
      self.req.get("/profile/"+CURRENT_YEAR+"/"+user['username'], (data) => {
        data.year = CURRENT_YEAR;
        self.profile = new ProfileModel(data);
        self.req.get(MEDIA_URI+"/listProfilePhotos.php?wwuid="+self.profile.wwuid+"&year="+CURRENT_YEAR, (photos) => {
          self.possiblePhotos = photos;
          self.possiblePhotos.push(DEFAULT_PHOTO);
          self.req.get("/profile/"+(Number(CURRENT_YEAR) - 101)+"/"+self.profile.username, (data) => {
            if (data.photo.indexOf(self.profile.wwuid) > -1) self.possiblePhotos.push(data.photo);
          }, null);
        }, null);
      }, null);
    }
  }

  saveProfile(): void {
    let data = JSON.parse(JSON.stringify(this.profile));
    this.req.post("/update/"+this.profile.username, data, res => {
      this.router.navigate(['/profile', this.profile.username]);
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

  changePhoto(url: string): void {
    this.profile.photo = url;
  }
}
