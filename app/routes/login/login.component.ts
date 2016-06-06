// login.component.ts

import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { RequestService } from 'aswwu-requests/aswwu-requests';

@Component({
  templateUrl: 'app/routes/login/login.component.html'
})

export class LoginComponent {
  username: string;
  password: string;

  constructor( private loc: Location, private req: RequestService ) { }

  login() {
    let self = this;
    this.req.login(this.username, this.password, data => {
      self.loc.back();
    });
  }
}
