import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    base_url = "http://angular_live_project_api.test";
    constructor(private _http:HttpClient) { }

    getCoursePostListing():Observable<any>
    {
        const endpoint = this.base_url + '/api/coursePost/coursePostListing';
        return this._http.post(endpoint, null);
    }

    getCoursePostDetail(formData:FormData):Observable<any>
    {
        const endpoint = this.base_url + '/api/coursePost/coursePostDetail';
        return this._http.post(endpoint, formData);
    }
}
