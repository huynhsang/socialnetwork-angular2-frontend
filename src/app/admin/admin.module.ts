import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing';

import { AdminComponent } from './admin.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

@NgModule({
    imports:[
      CommonModule,
      AdminRoutingModule
    ],
    declarations:[
      AdminComponent,
      ManageUserComponent
    ]
})
export class AdminModule{}