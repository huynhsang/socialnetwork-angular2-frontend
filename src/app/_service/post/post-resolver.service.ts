import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../../_model/post.model';
import { PostService } from './post.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PostResolverService implements Resolve<Post[]>{
    
    posts: Post[];
    constructor(private postService: PostService, private router: Router){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        //let id = route.params['id'];
        
        return this.postService.getPosts().map(data=>{
            return data});
       
    }
   
}