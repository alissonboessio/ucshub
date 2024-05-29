import { Routes } from '@angular/router';
import { AuthGuard } from './rotinas/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-production',
        loadComponent: () => import('./pages/production/list/list-production.component').then(m => m.ListProductionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'production',
        loadComponent: () => import('./pages/production/registration/production.component').then(m => m.ProductionComponent),
        canActivate: [AuthGuard]
      },
];
