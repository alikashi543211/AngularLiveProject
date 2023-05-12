import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-featured',
  templateUrl: './course-featured.component.html',
  styleUrls: ['./course-featured.component.css']
})
export class CourseFeaturedComponent implements OnInit {

    coursePostListing:any;
    constructor(private _courseService:CoursesService) { }

    ngOnInit(): void {
        this.loadCoursePostListing()
    }

    loadCoursePostListing()
    {
        this._courseService.getCoursePostListing().subscribe(res => {
            this.coursePostListing = res.data;
            // console.log(this.coursePostListing);
        })
    }

}
