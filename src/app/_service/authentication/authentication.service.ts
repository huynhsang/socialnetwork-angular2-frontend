import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { User } from '../../_model/user.model';

@Injectable()
export class AuthenticationService{
    
    constructor(public http: AuthHttp, private router: Router){}
    
    doLogin(credentials){
        return this.http.post('http://localhost:8080/api/auth/login', credentials)
            .map(res => {
                const data = res.json();
                if(data){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            });
    }
    
    doSignUp(new_account){
        return this.http.post('http://localhost:8080/api/auth/register', new_account)
            .map(res => {
                const data = res.json();
                if(data){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            })
    }
    
    doLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['index']);
    }
    
    isLoggedIn(){
        return tokenNotExpired();
    }
    
    getRoles(){
        const user: User = JSON.parse(localStorage.getItem('user'));
        return user.authorities;
    }
    
}