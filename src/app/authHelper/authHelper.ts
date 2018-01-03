import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import '../../../node_modules/msal/out/msal.js';
///<references path="../../../node_modules/out/dist/msal.d.ts"/>

// declare var Msal: any;
// declare var bootbox: any;

import { CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';
import '../rxjs-exstensions';

const CONFIGSETTINGS = CONFIG.Settings;

@Injectable()
export class AuthHelper {
  public access_token = null;

  private app: any;
  public user;
  public isAuthenticated = false;

  // authority = config.AAADInstance + '/' + config.TENANT_ID;
  constructor() {
    this.app = new Msal.UserAgentApplication(
      CONFIGSETTINGS.CLIENT_ID,
      null,
      (errorDesc, token, error, tokenType) => {
        // callback for login redirect
        if (error) {
          console.log(
            '[AuthCompnent - Login Callback Error] ' + JSON.stringify(error)
          );
          return;
        }
        console.log('[AuthCompnent] Callback for login');
        this.access_token = token;
      }
    );
    this.app.redirectUri = CONFIGSETTINGS.REDIRECT_URI;
  }

  public login() {
    return this.app.loginRedirect(CONFIGSETTINGS.SCOPES).then(
      idToken => {
        this.app.acquireTokenSilent(CONFIGSETTINGS.SCOPES).then(
          accessToken => {
            this.access_token = accessToken;
            console.log('[AuthCompnent] LOGIN :');
            this.user = this.app.getUser(); // AZURE AD
            this.isAuthenticated = true;
          },
          error => {
            this.app.acquireTokenPopup(CONFIGSETTINGS.SCOPES).then(accessToken => {
              console.log(
                '[AuthCompnent] Error acquiring the popup:\n' + error
              );
            });
          }
        );
      },
      error => {
        console.log('[AuthCompnent] Error during login:\n' + error);
      }
    );
  }

  public logout() {
    this.app.logout();
  }

  public isOnline(): boolean {
    return this.app.getUser() != null;
  }

  public getCurrentLogin() {
    const user = this.app.getUser();

    return user;
  }

  public getMSGraphAccessToken() {

    return this.app.acquireTokenSilent(CONFIGSETTINGS.SCOPES).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app.acquireTokenSilent(CONFIGSETTINGS.SCOPES).then(
          accessToken => {
            return accessToken;
          },
          err => {
            console.error(err);
          }
        );
      }
    );
  }
}
