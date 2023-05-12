import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    title = "Post";
    error = "";
    allPost:any;
    regForm:FormGroup;
    showGrid?:boolean;
    datasaved?:boolean;
    message?:string;
    PostIdToUpdate?:string|null;
    fileToUpload?:File|any;
    postImage?:string = "";

    constructor(private postService: PostService, private formBuilder:FormBuilder, private router:Router) {
        this.regForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            short_desc: ['', [Validators.required]],
            full_desc: ['', [Validators.required]],
            author: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadAllPost();
        this.showGrid = true;
    }

    loadAllPost()
    {
        this.postService.getPosts().subscribe( (data) => {
            // console.log(data.data);
            this.allPost = data.data;
        })
    }

    addPost() {
        this.showGrid = false;
        this.datasaved = false;
        this.message = "";
        this.PostIdToUpdate = null;
        this.fileToUpload = null;
        this.postImage = "/assets/images/user-placeholder.png";
    }

    handleFileInput(event: Event)
    {
        const inputElement = event.target as HTMLInputElement;
        const files: FileList | null = inputElement.files;
        if(files && files.length > 0)
        {
            this.fileToUpload = files.item(0);
            // Show image preview here
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.postImage = event.target.result;
            }
            reader.readAsDataURL(this.fileToUpload);
        }

    }

    onSubmit(regForm: FormGroup)
    {
        const formData = new FormData();
        if(this.fileToUpload !== undefined && this.fileToUpload !== null)
        {
            formData.append('image', this.fileToUpload);
        }
        formData.append('title', this.regForm.get('title')?.value);
        formData.append('short_desc', this.regForm.get('short_desc')?.value);
        formData.append('full_desc', this.regForm.get('full_desc')?.value);
        formData.append('author', this.regForm.get('author')?.value);
        formData.append('is_active', '1');

        if(this.PostIdToUpdate == null)
        {
            this.postService.createPost(formData)
                .subscribe(response => {
                // Handle the response here
                this.regForm.reset();
                this.datasaved = true;
                this.message = "Post Created";

            });
        }else{
            formData.append('course_post_id', this.PostIdToUpdate)
            this.postService.updatePost(formData)
                .subscribe(response => {
                // Handle the response here
                this.regForm.reset();
                this.datasaved = true;
                this.message = "Post Updated";
                this.PostIdToUpdate = null;

            });
        }
        return true;
    }

    onEdit(course_post_id: string)
    {
        const formData = new FormData();
        this.PostIdToUpdate = course_post_id;
        formData.append('course_post_id', course_post_id);
        this.postService.editPost(formData)
            .subscribe(response => {
            // Handle the response here
            var postData = response.data;
            this.showGrid = false;
            this.regForm.controls['title'].setValue(postData.title);
            this.regForm.controls['short_desc'].setValue(postData.short_desc);
            this.regForm.controls['full_desc'].setValue(postData.full_desc);
            this.regForm.controls['author'].setValue(postData.author);
            this.postImage = postData.image;

        });
        return true;
    }

    onDelete(course_post_id: string)
    {
        const formData = new FormData();
        formData.append('course_post_id', course_post_id);
        this.postService.deletePost(formData)
            .subscribe(response => {
            // Handle the response here
            this.datasaved = true;
            this.message = "Post Deleted";
            this.regForm.reset();
            this.loadAllPost();
        });
        return true;
    }

    Cancel()
    {
        this.showGrid = true;
        this.datasaved = false;
        this.loadAllPost();
    }

}
