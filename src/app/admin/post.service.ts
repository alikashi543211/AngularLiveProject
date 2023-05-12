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

    createPost(formData:FormData)
    {
        const endpoint = this.url + '/api/coursePost/coursePostStore';
        return this.http.post(endpoint, formData);
    }

    editPost(formData : FormData):Observable<any>
    {
        const endpoint = this.url + '/api/coursePost/coursePostDetail';
        return this.http.post(endpoint, formData);
    }

    updatePost(formData : FormData):Observable<any>
    {
        const endpoint = this.url + '/api/coursePost/coursePostUpdate';
        return this.http.post(endpoint, formData);
    }

    deletePost(formData : FormData):Observable<any>
    {
        const endpoint = this.url + '/api/coursePost/coursePostDelete';
        return this.http.post(endpoint, formData);
    }
}
