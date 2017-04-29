import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SiderbarRoutingModule } from'./siderbar.routing';

import { CarouselComponent } from '../carousel/carousel.component';
import { PostComponent } from '../post/post.component';
import { SiderbarComponent } from './siderbar.component';
import { NewsFeedComponent } from './newsfeed/newsfeed.component';
import { SearchComponent } from './search/search.component';

import { DateOrderByPipe } from '../../_pipe/date-orderby.pipe';
import { TranslatePipe } from '../../_pipe/translate.pipe';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SiderbarRoutingModule
    ],
    declarations: [
      SiderbarComponent,
      NewsFeedComponent,
      SearchComponent,
      PostComponent,
      CarouselComponent,
      DateOrderByPipe,
      TranslatePipe
    ],
    exports: [
      PostComponent,
      CarouselComponent,
      DateOrderByPipe,
      TranslatePipe
    ]
})

export class SiderbarModule{}