import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_model/user.model'; 

declare var $: any;

@Component({
    templateUrl: './siderbar.component.html',
    styleUrls: ['./siderbar.component.css']
})

export class SiderbarComponent implements OnInit{
    
    public currentUser: User;
    public people: Array<User> = new Array();
    
    constructor(private route: ActivatedRoute){
        this.currentUser = JSON.parse(localStorage.getItem("user"));
        this.route.data.subscribe((data: { people: User[]})=>{
            let temp: any = data.people;
            
            for(let i:number = 0; i< temp.length; i++){
                const user: User = JSON.parse(temp[i]);
                this.people.push(user);
            }
        });
    }
    
    ngOnInit(){
        
        $('.carousel').carousel();
    }
    
    isActive(person: User) {
        return person === this.people[0];
    }
}