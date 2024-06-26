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
        path: 'list-productions',
        loadComponent: () => import('./pages/production/list/list-production.component').then(m => m.ListProductionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'production',
        loadComponent: () => import('./pages/production/registration/production.component').then(m => m.ProductionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'production/:id',
        loadComponent: () => import('./pages/production/registration/production.component').then(m => m.ProductionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadComponent: () => import('./pages/project/registration/project.component').then(m => m.ProjectComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:id',
        loadComponent: () => import('./pages/project/registration/project.component').then(m => m.ProjectComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'list-projects',
        loadComponent: () => import('./pages/project/list/list-projects.component').then(m => m.ListProjectsComponent),
        canActivate: [AuthGuard]
      },
];
