import { Routes } from '@angular/router';
import { LawyersComponent } from './lawyers.component';
import { LawyerDeatilComponent } from './lawyer-deatil/lawyer-deatil.component';

export const lawyerRoutes: Routes = [
  { path: '', component: LawyersComponent },
  { path: ':id', component: LawyerDeatilComponent}
];
