import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModifArticleComponent } from './modif-article.component';

@NgModule({
  declarations: [ModifArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "modifArticle/:id", component: ModifArticleComponent }
    ])
  ]
})
export class ModifArticleModule { }
