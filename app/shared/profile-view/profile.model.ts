// profile.model.ts

import { MEDIA_URI, DEFAULT_PHOTO } from '../../shared/index';
const disabledFields = ["wwuid", "username", "views", "updated_at"];
const privateFields = disabledFields.concat(["full_name", "gender", "privacy"]);

export class ProfileModel {
  wwuid: string;
  username: string;
  full_name: string;
  photo: string;
  gender: string;
  birthday: string;
  email: string;
  phone: string;
  website: string;
  majors: string;
  minors: string;
  graduate: string;
  preprofessional: string;
  class_standing: string;
  high_school: string;
  class_of: string;
  relationship_status: string;
  attached_to: string;
  quote: string;
  quote_author: string;
  hobbies: string;
  career_goals: string;
  favorite_books: string;
  favorite_food: string;
  favorite_movies: string;
  favorite_music: string;
  pet_peeves: string;
  personality: string;
  views: number;
  privacy: number;
  department: string;
  office: string;
  office_hours: string;

  constructor(data: any) {
    if (typeof data == "string") data = JSON.parse(data);
    for (var key in data) {
      if (data[key].length > 0 && data[key] != "None") {
        this[key] = data[key].trim();
      }
    }
    if ((!this.full_name || this.full_name == '') && this.username) {
      this.full_name = this.username.replace(/\./g, ' ');
    }
    this.photo = MEDIA_URI + "/img-sm/" + (this.photo || DEFAULT_PHOTO).replace(MEDIA_URI, "");
    this.photo = this.photo.replace("//","/");
  }

  linkByField(key: string): string {
    let value = this[key];
    let link = 'javascript:void(0);';

    if (key == "phone") link = 'tel:'+value;
    if (key == "email") link = 'mailto:'+value;
    if (key == "website") link = (value.indexOf('http') > -1 ? value : 'http://'+value);

    return link;
  }
}
