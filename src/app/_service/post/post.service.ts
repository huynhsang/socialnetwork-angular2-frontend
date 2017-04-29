import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Post } from '../../_model/post.model';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//let postsPromise = Promise.resolve(Post);

@Injectable()
export class PostService{
    
    constructor(private http: AuthHttp){}
    
    private url: string = "http://localhost:8080/api/post";

    
    /*getUser(): Observable<User[]>{
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options)
                        .map((res:Response) => {const data = res.json()})
                        .catch((error:any) => Observable.throw(error.json().error || 'Error Server'));
    }*/
    
    getPosts(): Observable<Post[]>{
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options).map((res: Response) => res.json().data)
                                                .catch((error: any) => Observable.throw(error.json()));
        
    }
    
    postImage(post) {
        let location = this.url + "/upload";
        let body=JSON.stringify(post);
        let headers = new Headers();
        let token = localStorage.getItem("token").toString();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(location, body, options).map((response: Response) => response.json());
    }
    
}