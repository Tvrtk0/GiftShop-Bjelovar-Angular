import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { Meta, Title } from '@angular/platform-browser';

import appConfig from 'src/app/config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService, 
              private oktaAuth: OktaAuth,
              private title: Title,
              private meta: Meta) {

      this.oktaSignin = new OktaSignIn({
        logo: 'assets/img/logo.png',
        features: {
          registration: true
        },
        baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
        clientId: appConfig.oidc.clientId,
        redirectUri: appConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: appConfig.oidc.issuer,
          scopes: appConfig.oidc.scopes
        }
      });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    //el: id from div in login.component.html
    this.oktaSignin.renderEl(
      { el: '#okta-sign-in-widget' }, 

      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },

      (error: any) => {
        throw error;
      }
    )
    this.metaTags();
  }

  metaTags() {
    this.title.setTitle(`Gift Shop Bjelovar - DadoExpres`);
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow'});
  }
}