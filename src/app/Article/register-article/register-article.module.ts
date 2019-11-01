import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterArticleComponent } from './register-article.component';



@NgModule({
  declarations: [RegisterArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "register", component: RegisterArticleComponent }
    ])
  ]
})
export class RegisterArticleModule { }
