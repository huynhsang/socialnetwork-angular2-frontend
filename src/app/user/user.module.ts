import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { UserRoutingModule } from'./user.routing';

import { SiderbarModule } from './siderbar/siderbar.module';

import { UserComponent } from './user.index';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';

import { AutosizeDirective } from '../_directive/autosize.directive';

import { UserService } from '../_service/user/user.service';
import { PostService } from '../_service/post/post.service';
import { SearchShareService } from '../_service/share/search.service';

import { TranslateService } from '../_service/translate/translate.service';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      UserRoutingModule,
      SiderbarModule
    ],
    declarations: [
      UserComponent,
      NavigationComponent,
      ProfileComponent,
      ChatComponent,
      AutosizeDirective
    ],
    providers: [
      UserService,
      PostService,
      SearchShareService,
      TranslateService
    ]
})

export class UserModule{}