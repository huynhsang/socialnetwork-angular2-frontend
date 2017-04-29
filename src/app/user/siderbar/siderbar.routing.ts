import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthenticationGuard } from '../../_service/authentication/guard/authentication.guard';
import { RoleGuard } from '../../_service/authentication/guard/role.guard';

import { SiderbarComponent } from './siderbar.component';
import { NewsFeedComponent } from './newsfeed/newsfeed.component';
import { SearchComponent } from './search/search.component';

const siderbarRoutes: Routes = [
    {
        path:'',
        component: SiderbarComponent,
        canActivateChild: [AuthenticationGuard, RoleGuard],
        children: [
          {
              path: '',
              canActivateChild: [AuthenticationGuard, RoleGuard],
              children:[
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: NewsFeedComponent},
                { path: 'search', component: SearchComponent}
              ]
          }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(siderbarRoutes) ],
    exports: [ RouterModule ]
})
export class SiderbarRoutingModule{};

