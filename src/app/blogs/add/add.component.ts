import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetInfoJwtService } from 'src/app/services/get-info-jwt.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy{
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  addBlogForm: FormGroup;
  fileUs?: File;
  files: any;
  urllink:string = "assets/img/avatar.svg";
  base64Image = '';
  inputFile = false;
  reader = new FileReader();
  
  selectedFile?: File;


  constructor(
    private _fb: FormBuilder,
    private _blogsService: BlogsService,
    private _coreService: CoreService,
    private _router: Router,
    private _getInfo: GetInfoJwtService,
    private _http: HttpClient,
  ) {
    this.addBlogForm = this._fb.group({
      title: '',
      content: '',
      user_id: '',
      image: ['']
    })
  }

  ngOnInit(): void {
    this.addBlogForm.patchValue({})
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  selectFiles(event: any) {
    this.inputFile = true;
    const file: File = event.target.files[0];
    this.files = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
    }
  }
                           
  onAddSubmit() {
    if(this.addBlogForm.valid) {
      //console.log(this.base64Image);
      const formData = new FormData();
      formData.append('title', this.addBlogForm.value.title);
      formData.append('content', this.addBlogForm.value.content);
      formData.append('image', this.base64Image);
      formData.append('user_id',this._getInfo.getAuth().id);
      //debugger
      this._blogsService.addBlog(formData).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Blog added successfully')
          this._router.navigate(['blogs'])
        },
        error: err => console.log(err)
      })
    }
  }
}

