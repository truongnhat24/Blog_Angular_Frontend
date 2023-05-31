import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  API = 'http://127.0.0.1:8000/';
  data:any;
  constructor(
    private _homeService: HomeService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._homeService.homeBlog().subscribe((data:any) => {
      this.data = data.data[0];
      console.log(data);
    });
  }
}
