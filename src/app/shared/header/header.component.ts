import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/register/register.component';
import { LoginComponent } from 'src/app/login/login.component';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'blogAngular';

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _coreService: CoreService,
    private _auth: AuthService,
  ) {}
  
  openRegisterForm(){
    const dialogRef = this._dialog.open(RegisterComponent);
    return dialogRef;
  }

  openLoginForm() {
    const dialogRef = this._dialog.open(LoginComponent);
    return dialogRef;
  }

  checkAuth() {
    let ss = localStorage.getItem('access_token');
    if (ss != null && this._auth.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }

  onLogOut(): void {
    window.localStorage.clear();
    this._coreService.openSnackBar("Logout successfully!");
    this._router.navigate(['']);
  }
}
