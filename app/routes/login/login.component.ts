// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from 'aswwu-requests/aswwu-requests';

@Component({
  templateUrl: 'app/routes/login/login.component.html'
})

export class LoginComponent {
  username: string;
  password: string;

  constructor( private router: Router, private req: RequestService ) { }

  login() {
    this.req.login(this.username, this.password, data => {
      window.history.back(); // NOTE: do something better here
    });
  }
}
