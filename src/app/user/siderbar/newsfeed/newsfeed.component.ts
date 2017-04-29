import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../../_service/post/post.service';
import { Post } from '../../../_model/post.model';
import { Image } from '../../../_model/image.model';



@Component({
    templateUrl: './newsfeed.component.html',
    styleUrls: ['./newsfeed.component.css']
})

export class NewsFeedComponent implements OnInit{
    
    public posts: Array<Post> = new Array(); 
    
    constructor(private route: ActivatedRoute) {
    }
    
    ngOnInit(){
        this.route.data.subscribe((data: { posts: any})=>{
            data.posts.filter(element => {
                const obj: Post = JSON.parse(element);
                this.posts.push(obj);
                
            })
            
        });
    }
    
};
