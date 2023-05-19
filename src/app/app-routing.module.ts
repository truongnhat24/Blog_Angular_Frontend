import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './blogs/add/add.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'blogs', 
    canActivate: [AuthGuardGuard],  
    component: BlogsComponent},
  { path : 'blogs/add', component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
