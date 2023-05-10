import { Loginemployee } from './login/loginemployee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    url = 'http://angular_live_project_api.test'
    constructor(private http:HttpClient)
    {

    }
    createemployee(employee:Employee):Observable<Employee>{
        return this.http.post<Employee>(this.url + '/api/employeeMaster/employeeMasterStore', employee);
    }

    loginemployee(loginEmployee: Loginemployee): Observable<any>{
        return this.http.post(this.url + '/api/employeeMaster/employeeMasterLogin', loginEmployee);
    }
}
