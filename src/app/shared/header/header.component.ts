import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/register/register.component';
import { LoginComponent } from 'src/app/login/login.component';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'blogAngular';
  user?: any;
  API = 'http://127.0.0.1:8000/';

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _coreService: CoreService,
    private _auth: AuthService,
    private _userService: UsersService
  ) {}
  
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    if(this.checkAuth()){
      this._userService.getUser().subscribe((data:any) => {
        this.user = data.data[0];
        console.log(this.user);
      })
    }    
  }

  openRegisterForm(){
    const dialogRef = this._dialog.open(RegisterComponent);
    return dialogRef;
  }

  openLoginForm() {
    const dialogRef = this._dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getUser()
      }
    })
    return dialogRef;
  }

  checkAuth() {
    let ss = localStorage.getItem('access_token');
    if (ss != null && this._auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  onLogOut(): void {
    window.localStorage.clear();
    this.user = null;
    this._coreService.openSnackBar("Logout successfully!");
    this._router.navigate(['']);
  }
}
