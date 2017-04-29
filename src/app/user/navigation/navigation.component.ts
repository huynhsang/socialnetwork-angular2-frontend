import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_model/user.model';
import { AuthenticationService } from '../../_service/authentication/authentication.service'; 

import { SearchShareService } from '../../_service/share/search.service';
import { TranslateService } from '../../_service/translate/translate.service';

@Component({
    selector: 'navbar',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
    
})

export class NavigationComponent implements OnInit{
    
    public currentUser:User;
    search: any = {input: ''};

    public locales: any[];
    public selectLocale: any = {};
    
    constructor(private authService: AuthenticationService, private router: Router, private searchService: SearchShareService,
            private translateService: TranslateService){
         this.currentUser = JSON.parse(localStorage.getItem("user"));
    }

    ngOnInit(){
        this.locales = [
          { name: 'United States', value: 'us', icon: './assets/images/flags/us.svg' },
          { name: 'Việt Nam', value: 'vn', icon: './assets/images/flags/vn.svg' }
        ];
        this.selectLocale = this.locales[0];
    }
    
    logout(){
        this.authService.doLogout();
    }
    
    searching(value){
        
        
        this.search.input = value;
        this.searchService.getSearchResult(value).subscribe(
                data=>{
                        //console.log(data)
                        this.router.navigate(['./search']);
                        setTimeout(() => {
                            this.searchService.change(data);
                        }, 0);
                    });
    }
    
    isCurrentLang(lang: string) {
        return lang === this.translateService.currentLang;
    }
      
    selectLang(lang: any) {
        // set default;
        this.selectLocale = lang;
        this.translateService.use(lang.value);
    }
    
    
}