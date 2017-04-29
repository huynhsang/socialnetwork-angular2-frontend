import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_model/user.model';


@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
    
    users: Array<User> = new Array();
    
    constructor(private route: ActivatedRoute){}
    
    ngOnInit(){
        this.route.data.subscribe((data: { users: User[]})=>{
           let temp: any = data.users;
           for(let i:number = 0; i< temp.length; i++){
               const user: User = JSON.parse(temp[i]);
               this.users.push(user);
           }
           
        });
    }
};
