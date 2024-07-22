import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/authentication.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard] ,
    children: [
          {
            path: 'pulse',
            loadChildren: () => import('../page/pulse/pulse.module').then( m => m.PulsePageModule)
          },
          {
            path: 'collections',
            loadChildren: () => import('../page/collections/collections.module').then( m => m.CollectionPageModule)
          },
          {
            path: 'account',
            loadChildren: () => import('../page/account/account.module').then( m => m.AccountPageModule)
          },
      {
        path: '',
        redirectTo: '/tabs/pulse',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pulse',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
