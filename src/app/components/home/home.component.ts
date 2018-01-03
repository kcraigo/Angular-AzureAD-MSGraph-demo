import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModel, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { AuthHelper } from '../../authHelper/authHelper';
import { CONFIG } from '../../config';
import { PeopleFinderController } from '../../services/people-finder.controller';

// Services
import { Logger } from '../../services/logger.service';

// Models
import { Person } from '../people-finder/person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeopleFinderController, FormBuilder]
})

export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  @Input() personInfo: Person = null;
  @Input() managerInfo: Person = null;
  currentLoginName: string;
  currentLoginID: string;

  MsGraphToken: string;
  searchString: string;

  private _router: Router;
  constructor(
    private _auth: AuthHelper,
    private router: Router,
    private _logger: Logger,
    private _PPLController: PeopleFinderController,
    private fb: FormBuilder) {
    this._router = router;

// Listen for People-Finder events
// https://angular.io/guide/component-interaction#

    _PPLController.msGraphManagerInfoFound$.subscribe(
      managerInfo => {
        console.log('[CONTROLLER SENT Manager MSG TO HOME] ' + managerInfo);
        this.managerInfo = managerInfo;
      });

  }

  ngOnInit() {
    this.checkLogin();

  }

/**
 * Check if user is authenticated
 */
  checkLogin() {
    if (this._auth.isOnline()) {
      console.log('[HomeCompnent] LOGIN: Authenticated');
      this.isAuthenticated = true;
      const user = this._auth.getCurrentLogin();
      this.currentLoginID = user.displayableId;
      this.currentLoginName = user.name;
    } else {
      console.log('[HomeCompnent] LOGIN: Not Authenticated');
      this.isAuthenticated = false;
    }
  }

  getMSGraphToken()  {

    this._auth.getMSGraphAccessToken()
    .then(token => {
      console.log('[HomeCompnent - MSGraphToken]  ' + token);
      this.MsGraphToken = token;
    }, error => {
      console.error(error);
    });

  }

}
