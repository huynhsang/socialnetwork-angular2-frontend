import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../_service/authentication/guard/authentication.guard';
import { RoleGuard } from '../_service/authentication/guard/role.guard';

import { AdminComponent} from './admin.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const adminRoutes: Routes = [
  {
      path: '',
      component: AdminComponent,
      canActivate: [AuthenticationGuard, RoleGuard],
      children:[
        {
            path: '',
            canActivateChild: [AuthenticationGuard, RoleGuard],
            children: [
                 { path: 'users', component: ManageUserComponent}
            ]
        }
      
      ]
  }

]

@NgModule({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule
    ]
})
export class AdminRoutingModule{}