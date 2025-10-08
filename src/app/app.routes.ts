import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.route';
import { PERSON_DETAIL_ROUTES } from './features/person-detail/person-detail.route';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', children: DASHBOARD_ROUTES },
  { path: 'person/:id', children: PERSON_DETAIL_ROUTES },
  { path: '**', redirectTo: '/dashboard' },
];
