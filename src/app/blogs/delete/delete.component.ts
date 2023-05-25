import { Component,Inject,OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  blogId:number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
    private _route: ActivatedRoute,
    private _blogsService: BlogsService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<DeleteComponent>,
    ) {}
    
  ngOnInit(): void {
    this.blogId = this.data.blogId
    console.log(this.blogId);
  }

  deleteBlog():any {
    this._blogsService.deleteBlog(this.blogId).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Blog deleted successfully')
        this._dialogRef.close(true)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

