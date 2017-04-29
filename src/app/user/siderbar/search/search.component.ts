import { Component, OnInit } from '@angular/core';
import { SearchShareService } from '../../../_service/share/search.service';
import { User } from '../../../_model/user.model';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
    
    public users: Array<User> = new Array();
    
    constructor(private searchService: SearchShareService) {
        this.searchService.getDataValue().subscribe(
                data => { this.users = new Array();
                        let temp:any = data;
                        for(let i:number = 0; i< temp.length; i++){
                            const user: User = JSON.parse(temp[i]);
                            this.users.push(user);
                        }
                });
        /*console.log(this.users);*/
    }
    
    ngOnInit(){
      
    }
    
};
