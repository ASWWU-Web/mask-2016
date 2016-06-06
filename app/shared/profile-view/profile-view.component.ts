// profile-view.component.ts

import { Component } from '@angular/core';

import { CURRENT_YEAR, ProfileModel } from '../../shared/index';

@Component({
  selector: 'profile-view',
  inputs: [ 'profile', 'size' ],
  templateUrl: 'app/shared/profile-view/profile-view.component.html',
  styleUrls: [ 'app/shared/profile-view/profile-view.styles.css' ]
})

export class ProfileViewComponent {
  CURRENT_YEAR: string = CURRENT_YEAR;
  size: string = "tiny";
  profile: ProfileModel;
  fieldsInOrder: string[] = [
    "phone", "email", "website", "birthday", "class_standing",
    "relationship_status", "attached_to",
    "majors", "minors", "preprofessional", "graduate", "high_school", "class_of",
    "hobbies", "pet_peeves", "career_goals", "personality",
    "department", "office", "office_hours",
    "favorite_books", "favorite_food", "favorite_movies", "favorite_music",
    "quote", "quote_author"
  ];
}
