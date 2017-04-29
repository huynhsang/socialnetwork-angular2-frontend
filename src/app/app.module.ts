import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationModule } from './_service/authentication/authentication.module';
import { AppRoutingModule, RoutingGuard } from './app.routing';
import { AuthenticationService } from './_service/authentication/authentication.service';

import { TRANSLATION_PROVIDERS }   from './_languages/translation';


import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { IndexComponent } from './index/index.component';
import { LoginFormComponent } from './index/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    IndexComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AuthenticationModule
  ],
  providers: [
    AuthenticationService,
    RoutingGuard,
    TRANSLATION_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 // Diagnostic only: inspect router configuration
    constructor(router: Router) {
      //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
