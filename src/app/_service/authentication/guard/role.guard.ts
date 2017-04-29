import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../../_model/user.model';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad{
    
    constructor(private auth: AuthenticationService,
            private router: Router){}
    
    
    canActivate(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean{
        /*console.log(route);
        console.log("State   " + state);*/
        const userRoles: Object[] = this.auth.getRoles() as Object[];
        const routeRoles: string[] = route.data['roles'];
        const roles: string = routeRoles.join();
    
        for(const r in userRoles){
            if(roles.includes(userRoles[r]['authority'])){
                return true;
            }
        }
        
        this.router.navigate(['unauthorized']);
        return false;
    }
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return this.canActivate(route, state);
    }
    
    canLoad(route: Route): boolean{
        console.log("AAAAAAAAAAAA");
        console.log(route.path);
        
        const userRoles: Object[] = this.auth.getRoles() as Object[];
        const routeRoles: string[] = route.data['roles'];
        const roles: string = routeRoles.join();
        console.log("BBBBBBBBBBBBBB");
        for(const r in userRoles){
            if(roles.includes(userRoles[r]['authority'])){
                console.log("CCCCCCCCC");
                return true;
            }
        }
        console.log("dddddddddddddddddddd");
        this.router.navigate(['/index']);
        return false;
    }
    
}