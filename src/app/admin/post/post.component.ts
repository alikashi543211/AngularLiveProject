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
    PostIdToUpdate?:File|null;
    fileToUpload?:any = null;
    postImage?:string = "";

    constructor(private postService: PostService, private formBuilder:FormBuilder) {
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
            console.log(data.data);
            this.allPost = data.data;
        })
    }

    onDelete(id:any)
    {
        return true;
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
        return true;
    }

    Cancel()
    {
        this.showGrid = true;
    }

}
