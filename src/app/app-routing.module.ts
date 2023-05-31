import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './blogs/add/add.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ViewComponent } from './blogs/view/view.component';
import { DeleteComponent } from './blogs/delete/delete.component';
import { EditComponent } from './blogs/edit/edit.component';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'blogs', 
    canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: BlogsComponent },
      { path: 'add', component: AddComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'delete/:id', component: DeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
