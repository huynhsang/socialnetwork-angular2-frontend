import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../../_model/user.model';
import { AuthHttp } from 'angular2-jwt';

import {Observable} from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService{
    
    constructor(private http: AuthHttp){}
    
    private url: string = "http://localhost:8080/api/user/";

    
    /*getUser(): Observable<User[]>{
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options)
                        .map((res:Response) => {const data = res.json()})
                        .catch((error:any) => Observable.throw(error.json().error || 'Error Server'));
    }*/
    
    /*getUser(): Promise<User> {
        let headers = new Headers();
        let token = localStorage.getItem("token").toString();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options).toPromise()
              .then(response => response.json().data as User)
              .catch(this.handleError);                                                
    }*/
    
    
    getListPeopleKnows(): Observable<User[]>{
        let location = this.url + "peopleknows";
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(location, options)
                        .map((res:Response) => res.json().data)
                        .catch((error:any) => Observable.throw(error.json().error || 'Error Server'));
    }
    
    getListFriend(): Observable<User[]>{
        let location = this.url + "relationship/listfriend";
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(location, options)
                        .map((res:Response) => res.json().data)
                        .catch((error:any) => Observable.throw(error.json().error || 'Error Server'));
    }
    
    createRelationship(data){
        let location = this.url + "relationship/create";
        let body = JSON.stringify(data);
        let headers = new Headers();
        let token = localStorage.getItem("token").toString();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(location, body, options).map((res:Response) => res.json());
    }
    
    confirmRelationship(data): Observable<any>{
        let location = this.url + "relationship/confirm";
        let body = JSON.stringify(data);
        let headers = new Headers();
        let token = localStorage.getItem("token").toString();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(location, body, options).map((res:Response) => res.json());
    }
    
    deleteRelationship(data): Observable<any>{
        let location = this.url + "relationship/delete";
        let body = JSON.stringify(data);
        let headers = new Headers();
        let token = localStorage.getItem("token").toString();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(location, body, options).map((res:Response) => res.json());
    }
    
    getUser(id): Observable<User> {
        let location = this.url + id;
        return this.http.get(location).map((response: Response) => response.json().data);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}