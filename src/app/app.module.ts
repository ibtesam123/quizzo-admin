import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppbarComponent } from './components/appbar/appbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/sidenav-content/dashboard/dashboard.component';
import { CategoryComponent } from './components/sidenav-content/category/category.component';
import { GamesComponent } from './components/sidenav-content/games/games.component';
import { QuestionsComponent } from './components/sidenav-content/questions/questions.component';
import { UsersComponent } from './components/sidenav-content/users/users.component';
import { ApiService } from './services/api.service';
import { CategoryListComponent } from './components/sidenav-content/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/sidenav-content/category/add-category/add-category.component';
import { QuestionCatListComponent } from './components/sidenav-content/questions/question-cat-list/question-cat-list.component';
import { AddQuestionComponent } from './components/sidenav-content/questions/add-question/add-question.component';
import { QuestionDashboardComponent } from './components/sidenav-content/questions/question-dashboard/question-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppbarComponent,
    SidenavComponent,
    DashboardComponent,
    CategoryComponent,
    GamesComponent,
    QuestionsComponent,
    UsersComponent,
    AddCategoryComponent,
    CategoryListComponent,
    QuestionCatListComponent,
    AddQuestionComponent,
    QuestionDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, CookieService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
