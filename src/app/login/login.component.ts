import { Component, Inject, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { NgPluralCase } from '@angular/common';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  logForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _dialogRef: MatDialogRef<LoginComponent>,
    private _router: Router,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.logForm = this._fb.group({
      email: this._fb.control('', Validators.compose([Validators.required, Validators.email])),
      password: this._fb.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
    })
  }

  ngOnInit(): void {
    this.logForm.patchValue({});
  }

  hide = true

  onLogFormSubmit() {
    if (this.logForm.valid) {
      this._userService.login(this.logForm.value).subscribe((res:any) => {
        localStorage.setItem('access_token', res.data.access_token);
        this._dialogRef.close(true);
        console.log(res);
      });
    } else {
      this._coreService.openSnackBar(`Can't login`);
    }
  }
}