import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import('@app/views/main/main.component'),
  },
  {
    path: '**',
    redirectTo: 'calculator',
  },
];
