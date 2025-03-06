import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard] ,
    children: [
          {
            path: 'pulse',
            loadChildren: () => import('../page/pulse/pulse.module').then( m => m.PulsePageModule)
          },
          {
            path: 'account',
            loadChildren: () => import('../page/account/account.module').then( m => m.AccountPageModule)
          },
      {
        path: '',
        redirectTo: '/pulse',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pulse',
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
