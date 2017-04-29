import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild{
    
    constructor(private auth: AuthenticationService,
            private router: Router){}
    
    canActivate(){
        if(this.auth.isLoggedIn()) {
            return true;
          } else {
            this.router.navigate(['index']);
            return false;
          }
    }
    
    canActivateChild(){
        return this.canActivate();
    }
}
