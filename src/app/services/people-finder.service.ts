import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../rxjs-exstensions';

import { CONFIG } from '../config';
import { AuthHelper } from '../authHelper/authHelper';
import { Person } from '../components/people-finder/person.model';
import { Logger } from '../services/logger.service';
import { PersonInfo } from '../components/login/personInfo.model';

const Graph_V1_API = CONFIG.Settings.MS_GRAPH_V1;
const Graph_BETA_API = CONFIG.Settings.MS_GRAPH_BETA;

@Injectable()
export class PeopleFinderService {
private auth: AuthHelper;
private _headers = new Headers();

  constructor(
    private _http: Http,
    private _auth: AuthHelper) {
    this.auth = _auth;
    this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

/*
* Call the graph search REST API
*/
 searchByName(name: string, token: string) {
 if (!this._headers.has('Authorization') ) {
  const graphToken  = token;
  this._headers.append('Authorization', 'bearer ' + graphToken );
 }
 return this._http.get(Graph_V1_API + 'me/people?$search=' + name, {
    headers: this._headers
 })
  .map((res: Response) => res.json() as PersonInfo[])
  .catch(this.logAndPassOn);
 }

/*
* Call the graph users REST API
*/
 searchByUserPrincipalName(userPrincipalName: string, token: string) {
  if (!this._headers.has('Authorization') ) {
   const graphToken  = token;
   this._headers.append('Authorization', 'bearer ' + graphToken );
  }
  return this._http.get(Graph_BETA_API + 'users/' + userPrincipalName, {
     headers: this._headers
  })
   .map((res: Response) => res.json())
   .catch(this.logAndPassOn);
  }

/*
* Call the graph users REST API to return the users manager
*/
  managerInfo(userPrincipalName: string, token: string) {

    if (!this._headers.has('Authorization') ) {
      const graphToken  = token;
      this._headers.append('Authorization', 'bearer ' + graphToken );
     }
     return this._http.get(Graph_BETA_API + 'users/' + userPrincipalName + '/manager', {
        headers: this._headers
     })
      .map((res: Response) => res.json())
      .catch(this.logAndPassOn);
  }



 ////////////
 logAndPassOn(err: Error) {
    console.log(err);
    return Observable.throw(err);
 }
}
