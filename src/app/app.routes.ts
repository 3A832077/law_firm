import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BackendComponent } from './pages/backend/backend.component';

export const routes: Routes = [
  // --- 前台路由群組 ---
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/main/home/home.routes').then(m => m.HomeRoutes)
      },
    ],
  },
  // --- 後台路由群組 ---
  { path: '', redirectTo: '/backend/lawyers', pathMatch: 'full' },
  {
    path: 'backend',
    component: BackendComponent,
    children: [
      {
        path: 'lawyers',
        loadChildren: () => import('./pages/backend/lawyers/lawyers.routes').then(m => m.lawyersRoutes)
      },
      {
        path: 'articles',
        loadChildren: () => import('./pages/backend/article/article.routes').then(m => m.articleRoutes)
      },
      {
        path: 'reserves',
        loadChildren: () => import('./pages/backend/reserve/reserve.route').then(m => m.reserveRoutes)
      },
    ],
  },
];
