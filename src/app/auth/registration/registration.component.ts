import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    regForm?: FormGroup;
    dataSaved = false;
    message?: string;
    error?: string;
    constructor(private formBuilder: FormBuilder, private employeeservice: EmployeeService) { }

    ngOnInit(): void {
        this.setFormState();
    }

    setFormState(): void {
        this.regForm = this.formBuilder.group({
            last_name: ['', [Validators.required]],
            first_name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    onSubmit(){
        let employee = this.regForm?.value;
        this.createemployee(employee)
        this.regForm?.reset();
    }

    createemployee(employee: Employee)
    {
        this.employeeservice.createemployee(employee).subscribe(
            () => {
                this.dataSaved = true;
                this.message = "User Created";
                this.regForm?.reset();
            }
        )
    }

}
