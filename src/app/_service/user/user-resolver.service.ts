import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../../_model/user.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserResolverService implements Resolve<User>{
    
    constructor(private userService: UserService, private router: Router){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>{
        let id = route.params['id'];
        if(!id){
            const user: User = JSON.parse(localStorage.getItem("user"));
            id = user.id;
        }
        return this.userService.getUser(id).map(data=>{
            if(data){ 
                return data;
            }else{
                this.router.navigate(['/']);
                return null;
            }
            
        })
    }
}

@Injectable()
export class ListFriendResolverService implements Resolve<User[]>{
    constructor(private userService: UserService, private router: Router){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>{
        return this.userService.getListFriend().map(data=>{
            if(data){
                return data;
            }else{
                return null;
            }
        })
       
    }
}

@Injectable()
export class ListPeopleKnowResolverService implements Resolve<User[]>{
    constructor(private userService: UserService, private router: Router){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>{
        return this.userService.getListPeopleKnows().map(data=>{
            if(data){
                return data;
            }else{
                return null;
            }
        })
       
    }
}