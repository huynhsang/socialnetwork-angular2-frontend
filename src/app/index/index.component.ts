import { Component, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_service/authentication/authentication.service';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
    
    register: FormGroup;
    termOfServices: boolean = true;
    nextForm: boolean = false;
    signUpError: any = {"status": false, "msg": ""};

    constructor(private auth: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute,
            fb: FormBuilder){
        this.register = fb.group({
            'email' : [null, Validators.required],
            'password': [null, Validators.required],
            'born': [null, Validators.required],
            'givenName': [null, Validators.required],
            'familyName': [null, Validators.required],
            'address': [null, Validators.required],
            'phone': [null, Validators.required, , Validators.minLength(10)],
        })
        console.log("constructor");
    }

    doSignUp(value: any){
        console.log("SignUp");
        console.log(value);
        
        value.phone = "0"+ value.phone;
        console.log(value.phone);
        this.auth.doSignUp(value)
        .subscribe(
            data =>{
                this.router.navigate(['/'])
            },
            error =>{
                this.signUpError.status = true;
                this.signUpError.msg = "Email already exists";
            });
    }
    
    ngOnInit(){
        console.log("init");
    }
    
    ngOnChanges(){
        console.log("changes");
    }
    
    ngDoCheck(){
        console.log("do check");
    }
    
    ngOnDestroy(){
        console.log("destroy");
    }
    
    toggleTerm(){
        if(this.termOfServices) this.termOfServices = false;
        else this.termOfServices = true;
    }
}