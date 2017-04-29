import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_model/user.model';
import { Post } from '../../_model/post.model';
import { Relationship } from '../../_model/relationship.model';

import { UserService } from '../../_service/user/user.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    
    public posts: Array<Post> = new Array(); 

    currentUser: User;
    owner: User;
    status: string = "NOTHING";
    action_user_id: number = 0;

    constructor(private route: ActivatedRoute, private userService: UserService){
        this.currentUser = JSON.parse(localStorage.getItem("user"));
    }
    

    ngOnInit(){
        this.route.data.subscribe((data: { user: User})=>{
            this.owner = data.user;
            let temp: any = this.owner.posts;
            temp.filter(element => {
                const obj: Post = JSON.parse(element);
                this.posts.push(obj);
            })
        });
        
        let temp: any =  this.owner['relationships'];
        temp.filter(element=>{
            const obj: Relationship = JSON.parse(element);
            if(this.currentUser.id == obj.user_two_id){
                this.status = obj.status;
                this.action_user_id = obj.action_user_id;
            }
        })
    }
    
    sendRequestFriend(){
        this.status = "PENDING";
        this.action_user_id = this.currentUser.id;
        let model:any = {user_one_id: this.currentUser.id, user_two_id: this.owner.id,
                status: this.status, action_user_id: this.action_user_id};
       
        this.userService.createRelationship(model).subscribe(
                data => {console.log(data)},
                err => {console.log(err)});
    }
    
    cancelRequestFriend(){
        this.status = "DELETE";
        this.action_user_id = this.currentUser.id;
        let model:any = {user_one_id: this.currentUser.id, user_two_id: this.owner.id,
                status: this.status, action_user_id: this.action_user_id};
        this.userService.deleteRelationship(model).subscribe(
                data => {console.log(data); this.status = "NOTHING"},
                err => {console.log(err)});
    }
    
    confirmRequestFriend(){
        this.status = "ACCEPTED";
        this.action_user_id = this.currentUser.id;
        let model:any = {user_one_id: this.currentUser.id, user_two_id: this.owner.id,
                status: this.status, action_user_id: this.action_user_id};
        this.userService.confirmRelationship(model).subscribe(
                data => {console.log(data)},
                err => {console.log(err)});
    }
    
    removeFriend(){
        this.cancelRequestFriend();
    }
    
};
