import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthenticationGuard } from './_service/authentication/guard/authentication.guard';
import { RoleGuard } from './_service/authentication/guard/role.guard';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes =[
     {
         path:'index',
         component: IndexComponent
     },
     {
         path: 'admin',
         loadChildren: 'app/admin/admin.module#AdminModule',
         canLoad: [RoleGuard],
         data: {roles: ['ROLE_ADMIN']}
     },
     {
         path: '',
         loadChildren: 'app/user/user.module#UserModule',
         data: {roles: ['ROLE_USER'], preload: true }
     },
     {
         path: 'unauthorized',
         component: UnauthorizedComponent
     },{
         path: '**',
         redirectTo: ''
     }
 ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{ preloadingStrategy: SelectivePreloadingStrategy })
    ],
    exports: [
        RouterModule
    ],
    providers:[
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule{}

export const RoutingGuard: any[] = [
  AuthenticationGuard,
  RoleGuard
]