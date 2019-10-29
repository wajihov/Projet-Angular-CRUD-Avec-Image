import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListRegisterComponent } from './list-register/list-register.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModifContactComponent } from './modif-contact/modif-contact.component';
import { SearchPipe } from './pipe/search.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterArticleComponent } from './Article/register-article/register-article.component';
import { ListArticleComponent } from './Article/list-article/list-article.component';
import { ModifArticleComponent } from './Article/modif-article/modif-article.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    ListRegisterComponent,
    ModifContactComponent,
    SearchPipe,
    LoginComponent,
    RegisterArticleComponent,
    ListArticleComponent,
    ModifArticleComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
