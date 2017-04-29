import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../../_model/user.model';
import { AuthHttp } from 'angular2-jwt';

import {Observable} from 'rxjs/Rx';


@Injectable()
export class SearchShareService{
    @Output() data: EventEmitter<any> = new EventEmitter();
    
    private url: string = "http://localhost:8080/api/search";
    
    constructor(private http: AuthHttp){}
    
    change(value){
        this.data.emit(value);
    }
    
    getDataValue(){
        return this.data;
    }
    
    getSearchResult(str): Observable<User[]>{
        let body  = JSON.stringify(str);
        let token = localStorage.getItem("token").toString();
        let headers = new Headers();
        headers = new Headers({ 'Authorization': 'Bearer ' + token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, str, options)
                        .map((res:Response) => res.json().data)
                        .catch((error:any) => Observable.throw(error.json().error || 'Error Server'));
    }
    
    
}