import { Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const articlesRoutes: Routes = [
  { path: '', component: ArticleComponent },
  { path: ':id', component: ArticleDetailComponent }
];
