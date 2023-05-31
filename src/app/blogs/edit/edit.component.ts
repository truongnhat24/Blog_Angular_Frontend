import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetInfoJwtService } from 'src/app/services/get-info-jwt.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
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
  editBlogForm: FormGroup;
  fileUs?: File;
  files: any;
  urllink:string = "assets/img/avatar.svg";
  API = 'http://127.0.0.1:8000/';
  base64Image = '';
  inputFile = false;
  reader = new FileReader();
  data: any;
  blogId: number = 0;
  selectedFile?: File;

  constructor(
    private _fb: FormBuilder,
    private _blogsService: BlogsService,
    private _coreService: CoreService,
    private _router: Router,
    private _getInfo: GetInfoJwtService,
    private _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    this.editBlogForm = this._fb.group({
      title: this.data?.title,
      content: this.data?.content,
      image: this.data?.image
    })
  }

  ngOnInit(): void {
    this.getData();
    this.editBlogForm.patchValue({})
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getData(): void {
    this._route.params.subscribe(params => {
      this.blogId = params['id'];
    });
    this._blogsService.viewBlog(this.blogId).subscribe((data:any) => {
      this.data = data.data[0];
    });
  }

  selectFiles(event: any, value: any) {
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
    value.style.display = "none";
  }

  onEditSubmit(id: number) {
    if(this.editBlogForm.valid) {
      if (this.editBlogForm.value.image == null){
        delete this.editBlogForm.value.image
      } else {
        this.editBlogForm.value.image = this.base64Image;
      }
      this._blogsService.updateBlog(id, this.editBlogForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Blog edited successfully')
          this._router.navigate(['blogs'])
        },
        error: err => console.log(err)
      })
    }
  }
}