import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { CoreService } from './core/core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blogAngular';

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _coreService: CoreService,
    private _http: HttpClient
  ) {}
  
  ngOnInit(): void {
    // if(localStorage.getItem('access_token') != null) {
    //   let access_token = localStorage.getItem('access_token');
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${access_token}`
    //   });
    //   const requestOptions = { headers: headers};
    //   // this._http.get('http://127.0.0.1:8000/api')
    // }
  }
}