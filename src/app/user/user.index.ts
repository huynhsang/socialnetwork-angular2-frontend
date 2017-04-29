import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ChatComponent } from './chat/chat.component';

@Component({
    templateUrl:'./user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent{
    public AppName="VnMatchMaker";
}