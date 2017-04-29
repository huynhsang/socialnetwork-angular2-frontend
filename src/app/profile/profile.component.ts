import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_model/user.model';
import { Post } from '../_model/post.model';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    
    public posts: Array<Post> = new Array(); 

    currentUser: User;
    
    constructor(private route: ActivatedRoute){}
    

    ngOnInit(){
        this.route.data.subscribe((data: { user: User})=>{
            this.currentUser = data.user;
            let temp: any = this.currentUser.posts;
            temp.filter(element => {
                const obj: Post = JSON.parse(element);
                this.posts.push(obj);
                
            })
        });
    }
    
};
