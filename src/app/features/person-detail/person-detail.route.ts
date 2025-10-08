// src/app/features/person-detail/person-detail.routes.ts
import { Routes } from '@angular/router';
import { PersonDetail } from './pages/person-detail/person-detail';

export const PERSON_DETAIL_ROUTES: Routes = [
  { path: '', component: PersonDetail },
];
