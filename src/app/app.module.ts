import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogsComponent } from './blogs/blogs.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './blogs/add/add.component';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ViewComponent } from './blogs/view/view.component';
import { DeleteComponent } from './blogs/delete/delete.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { CommentsComponent } from './blogs/comments/comments.component';
import { ReplyComponent } from './blogs/comments/reply/reply.component';
import { EditComponent } from './blogs/edit/edit.component';
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BlogsComponent,
    HeaderComponent,
    HomeComponent,
    AddComponent,
    ViewComponent,
    DeleteComponent,
    CommentsComponent,
    ReplyComponent,
    EditComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    FormsModule,
    NgxEditorModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    JwtHelperService,
    AuthService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { 
      provide: MAT_DIALOG_DATA, 
      useValue: {} 
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
