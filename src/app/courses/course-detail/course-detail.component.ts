import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
    coursePostId?:string;
    coursePost:any = null;
    constructor(private _courseService:CoursesService, private _route:ActivatedRoute) { }

    ngOnInit(): void {
        this.getCoursePostId();
        this.loadCoursePostDetail();
    }

    getCoursePostId()
    {
        this._route.params.subscribe(params => {
            this.coursePostId = params['id'];
            // console.log(this.coursePostId);
        })
    }

    loadCoursePostDetail()
    {
        const formData = new FormData();
        if(this.coursePostId !== undefined)
        {
            formData.append('course_post_id', this.coursePostId);
        }
        this._courseService.getCoursePostDetail(formData).subscribe(res => {
            this.coursePost = res.data;
            console.log(this.coursePost);
        });
    }

}
