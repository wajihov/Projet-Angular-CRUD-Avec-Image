import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "listArticle", component: ListArticleComponent }
    ])
  ]
})
export class ListArticleModule { }
