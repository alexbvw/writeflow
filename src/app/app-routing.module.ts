import { NgModule } from '@angular/core';
import { AuthGuard } from './services/guard/authentication.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.component.module').then(m => m.TabsPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./organism/authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'redirect',
    loadChildren: () => import('./organism/redirect/redirect.module').then( m => m.RedirectPageModule)
  },
  {
    path: 'collection/:slug',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/single/collection/collection.module').then( m => m.CollectionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
