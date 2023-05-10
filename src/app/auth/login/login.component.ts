import { Loginemployee } from './loginemployee';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    message: string = '';
    Error: boolean = false;
    constructor( private employeeservice: EmployeeService, private formBuilder:FormBuilder, private router:Router) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {
        // this.setFormState();
    }

    setFormState(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    onSubmit(loginForm:FormGroup)
    {
        let login = this.loginForm.value;
        // debugger;
        // this.Error = true;
        // this.message = "User ID/Password Wrong";
        this.login(login);
    }

    login(loginEmployee: Loginemployee)
    {
        this.employeeservice.loginemployee(loginEmployee).subscribe(
            employee => {
                debugger;
                if(employee.success)
                {
                    this.loginForm.reset();
                    localStorage.setItem("Employee", JSON.stringify(employee));
                    this.router.navigate(['dashboard']);
                }else{
                    this.Error = true;
                    this.message = "User ID/Password Wrong";
                }
            }
        )
    }

}
