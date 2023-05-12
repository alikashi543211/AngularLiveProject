import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    title = 'Course list';
    coursePostListing:any;
    constructor(private _courseService:CoursesService) { }

    ngOnInit(): void {
        this.loadCoursePostListing();
    }

    loadCoursePostListing()
    {
        this._courseService.getCoursePostListing().subscribe(res => {
            this.coursePostListing = res.data;
            // console.log(this.coursePostListing);
        })
    }

}
