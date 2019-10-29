import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListRegisterComponent } from './list-register/list-register.component';
import { ModifContactComponent } from './modif-contact/modif-contact.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { RegisterArticleComponent } from './Article/register-article/register-article.component';
import { ModifArticleComponent } from './Article/modif-article/modif-article.component';
import { ListArticleComponent } from './Article/list-article/list-article.component';


const routes: Routes = [
  { path: "", canActivate: [AuthGuardGuard], component: RegisterComponent },
  { path: "register", canActivate: [AuthGuardGuard], component: RegisterComponent },
  { path: "modification/:id", canActivate: [AuthGuardGuard], component: ModifContactComponent },
  { path: "list-register", canActivate: [AuthGuardGuard], component: ListRegisterComponent },
  {
    path: "article", component: ArticleComponent, canActivate: [AuthGuardGuard], children: [
      { path: "", component: RegisterArticleComponent },
      { path: "register-article", component: RegisterArticleComponent },
      { path: "modif-article/:id", component: ModifArticleComponent },
      { path: "list-article", component: ListArticleComponent }
    ]
  },  
  { path: "login", component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
