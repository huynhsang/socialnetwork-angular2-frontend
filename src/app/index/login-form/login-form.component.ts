import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_service/authentication/authentication.service';
declare var $: any;

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit{
    
    redirect: string;
    rememberMe: boolean = false;
    loginError: any = {"status": false, "msg": ""};
    
    public loginForm = this.fb.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });
    
    constructor(public fb: FormBuilder, public auth: AuthenticationService, public router: Router,
            public activatedRoute: ActivatedRoute){
    }
    
    ngOnInit(){
        this.auth.doLogout();
        this.redirect = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        console.log(this.redirect);
    }
    
    login(value){
        let credentials:any = value;
        //credentials.rememberMe = this.rememberMe;
        //console.log(JSON.stringify(credentials));
        this.auth.doLogin(credentials)
            .subscribe(
                data =>{
                    this.loginError.status = false;
                    $('#login').modal('hide');
                    this.router.navigate([this.redirect])
                },
                error =>{
                    this.loginError.status = true;
                    this.loginError.msg = error.json().message;
                },
                () => {
                    
                    console.log("Complete!");
                    /*//console.log(localStorage.getItem("user"));
                    const user: User = JSON.parse(localStorage.getItem('user'));
                    //console.log(JSON.parse(localStorage.getItem('user')));
                    //console.log(user);
                    var roles: Object[] = user.authorities as Object[];
                    //console.log(user.authorities[0]);*/                    
                    });
    }
    
    toggle(){
        if(this.rememberMe == false) this.rememberMe = true;
        else this.rememberMe = false;
    }
}