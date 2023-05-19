import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { CoreService } from '../core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  resForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.resForm = this._fb.group({
      name: this._fb.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: this._fb.control('', Validators.compose([Validators.required, Validators.email])),
      password: this._fb.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      role: this._fb.control('0'),
      status: this._fb.control('1'),
    })
  }
  // password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),

  ngOnInit(): void {
    this.resForm.patchValue({});
  }

  hide = true;

  onResFormSubmit() {
    if(this.resForm.valid) {
      this._userService.addUser(this.resForm.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar("Register successfully");
        this._dialogRef.close(true);
        this._dialog.open(LoginComponent);
      },
      error: (err: any) => {
        this._coreService.openSnackBar("Register failed");
        console.error(err);
      }
    })
  }
    
  }
}
