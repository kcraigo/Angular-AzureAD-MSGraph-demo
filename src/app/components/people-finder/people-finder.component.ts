import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthHelper } from '../../authHelper/authHelper';

// Services
import { PeopleFinderController } from '../../services/people-finder.controller';
import { PeopleFinderService } from '../../services/people-finder.service';
import { Logger } from '../../services/logger.service';

// Models
import { Person } from '../people-finder/person.model';

@Component({
  selector: 'app-people-finder',
  templateUrl: './people-finder.component.html',
  styleUrls: ['./people-finder.component.css'],
  providers: [PeopleFinderService]
})
export class PeopleFinderComponent implements OnInit {
  searchName: string;
  searchNameForManager: string;
  userPrincipalhName: string;
  msGraphToken: string;
  person: Person;
  person2: Person;
  person3: Person;
  manager: Person;

  constructor(
    private _logger: Logger,
    private _auth: AuthHelper,
    private _pplFinderController: PeopleFinderController,
    private _peopleFinderService: PeopleFinderService
  ) {}

  ngOnInit() {
  }

/*
* Query the MSGraph to get an Access Token
*/
  getMSGraphToken() {
    this._auth.getMSGraphAccessToken().then(
      token => {
        // console.log('[PPL PICKER - TOKEN] ${searchName}' + token);
      },
      error => {
        console.log(error);
      }
    );
  }

/*
* Query the MSGraph for the specified name
*/
  searchByName() {
    this._auth.getMSGraphAccessToken().then(
      token => {
        this._peopleFinderService
          .searchByName(this.searchName, token)
          .subscribe(
            data => this.person = data.value,
            err => this._logger.log(err),
            () => this.processPersonInfo()
          );
      },
      error => {
        console.log(error);
      }
    );
  }
  processPersonInfo() {
    console.log('[PeoplePicker - searchByName] ' + this.person.displayName);
    this._pplFinderController.msGraphPersonInfo(this.person);
  }

/*
* Query the MSGraph for the specified userPrincipalhName
*/
searchByUserPrincipalName() {
  this._auth.getMSGraphAccessToken().then(
    token => {
      this._peopleFinderService
        .searchByUserPrincipalName(this.userPrincipalhName, token)
        .subscribe(
          data => this.person2 = data,
          err => this._logger.log(err),
          () => this.userPrincialNameInfo()
        );
    },
    error => {
      console.log(error);
    }
  );
}

userPrincialNameInfo() {
  console.log('[PeoplePicker - searchByUserPrincipalName] ' + this.person2.displayName);
}

/*
* Get the persons information with the MSGraph
*/
searchByNameThenCallManager() {
  this._auth.getMSGraphAccessToken().then(
    token => {
      this._peopleFinderService
        .searchByUserPrincipalName(this.searchNameForManager, token)
        .subscribe(
          data => this.person3 = data,
          err => this._logger.log(err),
          () => this.getManager()
        );
    },
    error => {
      console.log(error);
    }
  );
}
userPrincipalNameInfo2() {
  console.log('[PeoplePicker - searchByNameThenCallManager] ' + this.person3.displayName);
}

/*
* Query the MSGraph for the users Manager information
*/
getManager() {
  this._auth.getMSGraphAccessToken().then(
    token => {
      this._peopleFinderService
        .searchByUserPrincipalName(this.person3.userPrincipalName + '/manager', token)
        .subscribe(
          data => this.manager = data,
          err => this._logger.log(err),
          () => this.managerInformation()
        );
    },
    error => {
      console.log(error);
    }
  );
}
managerInformation() {
  console.log('[PeoplePicker - getManager] ' + this.manager.displayName);
  this._pplFinderController.msGraphManagerInfo(this.manager);
}



}
