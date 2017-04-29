import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthenticationGuard } from '../_service/authentication/guard/authentication.guard';
import { RoleGuard } from '../_service/authentication/guard/role.guard';

import { PostResolverService } from '../_service/post/post-resolver.service';
import { UserResolverService, ListFriendResolverService, ListPeopleKnowResolverService } from '../_service/user/user-resolver.service';

import { SiderbarModule } from './siderbar/siderbar.module'

import { UserComponent } from './user.index';
import { ProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
    {
        path:'',
        component: UserComponent,
        canActivate: [AuthenticationGuard, RoleGuard],
        resolve:{
            users: ListFriendResolverService, 
        },
        children: [
          {
              path: '',
              canActivateChild: [AuthenticationGuard, RoleGuard],
              children:[
                { 
                    path: '',
                    loadChildren: () => SiderbarModule,
                    resolve:{
                        posts: PostResolverService,
                        people: ListPeopleKnowResolverService,
                        
                    }
                },
                { 
                    path: 'profile/:id',
                    component: ProfileComponent,
                    resolve:{
                        user: UserResolverService
                    }}
              ]
          }  
        ]
    }
]
@NgModule({
    imports: [ RouterModule.forChild(userRoutes) ],
    exports: [ RouterModule ],
    providers: [
      PostResolverService,
      UserResolverService,
      ListFriendResolverService,
      ListPeopleKnowResolverService
    ]
})
export class UserRoutingModule{};

