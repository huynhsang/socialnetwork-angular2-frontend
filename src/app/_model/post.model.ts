import { User } from './user.model';
import { Image } from './image.model';

export class Post{
    id: number;
    images : Image[];
    owner: User;
    constructor(public title: string, public content: string, public created: Date){}
    
    setImages(imgs: Image[]){
        this.images= imgs;
    }
    
    setOwner(user: User){
        this.owner = user;
    }
}