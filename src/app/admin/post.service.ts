import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    url = "http://angular_live_project_api.test"
    constructor(private http:HttpClient) { }

    getPosts():Observable<any>{
        return this.http.post<Post[]>(this.url + '/api/coursePost/coursePostListing', null);
    }
}
