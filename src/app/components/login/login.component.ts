import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

import { AuthHelper } from '../../authHelper/authHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _router: Router;
  private _auth: AuthHelper;

  constructor(router: Router, auth: AuthHelper) {
    this._router = router;
    this._auth = auth;
  }

  ngOnInit() {
// Call authhelper,if user is logged in redirect to the home page, else redirect to the Azure AD login page.
    if (this._auth.isOnline()) {
      this._router.navigate(['/home']);
    } else {
      this._auth.login();
    }
  }

}
